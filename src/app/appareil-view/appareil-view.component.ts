import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit{

  isAuth = false;

  lastUpdate!: Observable<Date>;

 
    appareils!: any[];
    appareilSubscription!: Subscription;



    ngOnInit() {//cette fonction s'execute toujours aprés le constructeur
      
      
      this.lastUpdate = new Observable<Date>(observer => {
        setTimeout(() => {
          observer.next(new Date());
          observer.complete();
        }, 2000);
      });



       this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
          (appareils: any[]) =>
          {
            this.appareils = appareils
          }
       );

       this.appareilService.emitAppareilSubject();
    }

    constructor(private appareilService: AppareilService){
      //il est executer au moment de la creation du componenent

      setTimeout(
        () => {
          this.isAuth = true;
        }, 4000
      );
    }

    onAllumer() {
      this.appareilService.switchOnAll();
    }

    onEteindre(){
      this.appareilService.switchOffAll(); 
    }

    onSave() {
      this.appareilService.saveAppareilsToServer();
    }

    onFetch(){
      this.appareilService.getAppareilsFromServer();
    }

}
