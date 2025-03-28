import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit{

    name: string = 'Appareil';
    status: string = 'Status';

    constructor(private appareilService: AppareilService,
                private route: ActivatedRoute){}

    ngOnInit(): void {
       const id = this.route.snapshot.params['id'];
       //id = l'expression qu'on va entrer apres le slash '/' au niveau de l'URL
      this.name = this.appareilService.getAppareilById(+id)!.name;
      this.status = this.appareilService.getAppareilById(+id)!.status;

    }
}
