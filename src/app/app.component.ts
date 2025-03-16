import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Observable, Subscription, interval } from 'rxjs';

//import 'rxjs/Rx';

import { AppareilService } from './services/appareil.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe, AsyncPipe]
})

export class AppComponent implements OnInit, OnDestroy{

  secondes!: number;
  counterSubscription!: Subscription
  
  constructor(){
    
  }


  ngOnInit(): void {
      const counter = interval(1000);//ca cree un eobservable qui émettra un chiffre toute les secondes
      
      this.counterSubscription = counter.subscribe(
          (value: number) => {
            this.secondes = value;
          }
      );
  }


  ngOnDestroy(): void {
     this.counterSubscription.unsubscribe();
  }


}

