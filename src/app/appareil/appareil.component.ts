import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit{

    @Input() appareilName!: string; // le point d'exclamation correspond à une promesse d'initialisation de la variable, on premet à angular de le faire plutard
    //si c'etait plutot un point d'interrogation, cela correspondrait à dire à angular que la variable n'est pas obligé d'etre initialisée
    @Input() appareilStatus!: string;
    @Input() indexOfAppareil!: number;
    @Input() id!: number;


    //appareilName = "Machine à laver";
    //appareilStatus = 'éteint';

    constructor(private appareilService: AppareilService) {}

    ngOnInit(): void {
      
    }

    getStatus(){
      return this.appareilStatus;
    }

    getColor(){
      if(this.appareilStatus === 'allumé'){
        return 'green';
      }else if(this.appareilStatus === 'éteint'){
        return 'red';
      }
      return'';
    }

    

    onSwitchOn(){
      this.appareilService.switchOnOne(this.indexOfAppareil);
    }

    onSwitchOff(){
      this.appareilService.switchOffOne(this.indexOfAppareil);
    }
}
