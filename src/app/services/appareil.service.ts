import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Appareil } from "../models/Appareil.models";

@Injectable()
export class AppareilService{
   

  appareilSubject = new Subject<any[]>();

  //appareil est uniquement accessible depuis l'intérieur du service
  /*private appareils = [
    {
      id: 1,
      name: 'Machine a laver',
      status: 'allumé'
    },
    {
      id: 2,
      name: 'Télévision',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'ordinateur',
      status: 'éteint'
    }
  ];*/

  private appareils : Appareil[] = [];

  constructor(private httpClient: HttpClient){}


  //methode qui fera en sorte que le subject emette la liste des appareils pour pouvoir y accéder depuis l'extérieur

  emitAppareilSubject(){

    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number){
  
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }


  switchOnAll(){
    for(let appareil of this.appareils){
        appareil.status = 'allumé'
    }
    this.emitAppareilSubject();
  }


  switchOffAll(){
    for(let appareil of this.appareils){
        appareil.status = 'éteint'
    }
    this.emitAppareilSubject();
  }


  switchOnOne(index: number){
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }


  switchOffOne(index: number){
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length-1)].id+1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  
  //le .subscribe permet de réagir à la réponse du serveur
  saveAppareilsToServer() {// on enregistre "this.appareils" sous le nom "appareils" sur le serveur et au format json
    this.httpClient
    .put('https://http-client-demos-40948-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur de sauvegarde !'+error);
      }
    )

    //plutot que d'utiliser "put" là haut, on aurait pu use "post", sauf que avec post, on peut ajouter des appareils qui sont déja là donc il y'aura des doublons
    //alors que avec put, le serveur écrase les doublons preécedent
  }



  getAppareilsFromServer(){
    this.httpClient
        .get<any[]>('https://http-client-demos-40948-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response;
            this.emitAppareilSubject();
          },
          (error) => {
            console.log('erreur')
          }
        );
  }

}