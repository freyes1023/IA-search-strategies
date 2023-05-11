import { MdlSignosSintomas, SignosSintomasService } from './../../../services/queries/signos-sintomas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert-system',
  templateUrl: './expert-system.component.html',
  styleUrls: ['./expert-system.component.scss']
})
export class ExpertSystemComponent implements OnInit {

signosSintomas : MdlSignosSintomas[] = [];

  constructor(private signosSintomasService: SignosSintomasService) { }

  ngOnInit(): void {
    this.signosSintomasService.getSintomas().subscribe(data => {
      console.log('data',data);
      if (data) {
        this.signosSintomas = data.sort((a,b) => (a.order > b.order) ? 1 : -1)
        console.log('signosSintomas',this.signosSintomas);
      }
    })
  
  }

}
