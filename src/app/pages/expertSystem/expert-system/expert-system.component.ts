import { EnfermedadesService } from './../../../services/queries/enfermedades.service';
import { SignosSintomasService } from './../../../services/queries/signos-sintomas.service';
import { MdlSignosSintomas } from "src/app/Interfaces/MdlSignosSintomas";
import { Component, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/queries/rules.service';
import { MdlRules } from 'src/app/Interfaces/MdlRules';
import { MdlEnfermedad } from 'src/app/Interfaces/MdlEnfermedad';

@Component({
  selector: 'app-expert-system',
  templateUrl: './expert-system.component.html',
  styleUrls: ['./expert-system.component.scss']
})
export class ExpertSystemComponent implements OnInit {

  signosSintomas: MdlSignosSintomas[] = [];
  sintomasSelected: MdlSignosSintomas[] = []
  constructor(private signosSintomasService: SignosSintomasService, private rulesService: RulesService, private enfermedadesService:  EnfermedadesService) { }

  ngOnInit(): void {
    this.signosSintomasService.getSintomas().subscribe(data => {
      console.log('data', data);
      if (data) {
        this.signosSintomas = data.sort((a, b) => (a.order > b.order) ? 1 : -1)
        console.log('signosSintomas', this.signosSintomas);
      }
    })

  }

  Check(index:number){
    this.signosSintomas[index].checked = !this.signosSintomas[index].checked;
    console.log('signosSintomas', this.signosSintomas);
    this.sintomasSelected =  this.signosSintomas.filter(element => element.checked).map(element => element);
  }

  Generate(){
    const sintomas = this.signosSintomas.filter(element => element.checked).map(element => element.ID);
    
    if (this.sintomasSelected.length < 3) {
      alert('Seleccione al menos un sintoma');
      return
    } 
      
    
    console.log('sintomas', sintomas);

    //if (sintomas.length == 0) 

    this.rulesService.getRulesContains(sintomas).then(data => {
      console.log('Rules',data);
      if (data.length == 0) {
        alert('No hay reglas que cumplan con esos sintomas');
        return
      }
      if (data.length == 1) {
       //  alert('Regla: ' + data[0].Descripcion);
        this.enfermedadesService.getEnfermedadId(data[0].Enfermedad).then(enfermedad => {;
       alert('Según sintomas Hay una Gran probabilidad de que la la enfermedad sea ' + enfermedad[0].Descripcion)
       return
      });
      }
      let enfermedades:string[] = []
        this.enfermedadesService.getEnfermedadIds(data.map((data)=>{return data.Enfermedad})).then(enfermedades => {
          console.log('enfermedades', enfermedades);
          
          enfermedades.push(enfermedades[0]) 
        })

     /*  data.forEach(element => {
        this.enfermedadesService.getEnfermedadId(element.Enfermedad).then(enfermedad => {
          enfermedades.push(enfermedad[0].Descripcion) 
        })

      }) */
      const a = new Set(enfermedades);
      enfermedades = [...a];
      console.log('segun sintomas hay una gran probabilidad de que la enfermedad sean', enfermedades.join(', '));
      console.log();
      
      
      
    })
    
  }

  /*  async addRules() {
     dataRules.forEach(async element => {
       const response = await this.rulesService.addRules(element);
       console.log('response', response);
     }) 
   }
  async addSintomas() {
    dataSintomas.forEach(async (element: MdlSignosSintomas) => {
      const response = await this.signosSintomasService.addSintomas(element);
      console.log('response', response);
    })
  }
*/
}
/* const dataSintomas: MdlSignosSintomas[] = [
  {
    ID: '103',
    Descripcion: 'Migraña',
    order: 3
  },
  {
    ID: '104',
    Descripcion: 'Tos',
    order: 4
  },
  {
    ID: '105',
    Descripcion: 'Dolor de garganta',
    order: 5
  },
  {
    ID: '106',
    Descripcion: 'Congestion Nasal',
    order: 6
  },
  {
    ID: '107',
    Descripcion: 'Dificultad para respirar',
    order: 7
  },
  {
    ID: '108',
    Descripcion: 'Fatiga',
    order: 8
  },
  {
    ID: '109',
    Descripcion: 'Dolor en el pecho',
    order: 9
  },
  {
    ID: '110',
    Descripcion: 'Dolor Muscular',
    order: 10
  },
  {
    ID: '111',
    Descripcion: 'Nauseas',
    order: 11
  },
  {
    ID: '112',
    Descripcion: 'Vomito',
    order: 12
  },
  {
    ID: '113',
    Descripcion: 'Diarrea',
    order: 13
  }
]
 */
/* const dataRules = [
  {
    ID: 'R3',
    Descripcion: ['102', '103', '104'],
    Enfermedad: '001'
  }, {
    ID: 'R4',
    Descripcion: ['102', '103', '105'],
    Enfermedad: '001'
  }, {
    ID: 'R5',
    Descripcion: ['102', '103', '106'],
    Enfermedad: '001'
  }, {
    ID: 'R6',
    Descripcion: ['102', '103', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R7',
    Descripcion: ['102', '103', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R8',
    Descripcion: ['102', '103', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R9',
    Descripcion: ['102', '104', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R10',
    Descripcion: ['103', '104', '105'],
    Enfermedad: '001'
  }, {
    ID: 'R11',
    Descripcion: ['103', '104', '106'],
    Enfermedad: '001'
  }, {
    ID: 'R12',
    Descripcion: ['103', '104', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R13',
    Descripcion: ['103', '104', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R14',
    Descripcion: ['103', '104', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R15',
    Descripcion: ['104', '105', '106'],
    Enfermedad: '001'
  }, {
    ID: 'R16',
    Descripcion: ['104', '105', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R17',
    Descripcion: ['104', '105', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R18',
    Descripcion: ['104', '105', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R19',
    Descripcion: ['105', '106', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R20',
    Descripcion: ['105', '106', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R21',
    Descripcion: ['105', '106', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R22',
    Descripcion: ['106', '108', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R23',
    Descripcion: ['106', '108', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R24',
    Descripcion: ['108', '110', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R25',
    Descripcion: ['102', '103', '104', '105'],
    Enfermedad: '001'
  }, {
    ID: 'R26',
    Descripcion: ['102', '103', '104', '106'],
    Enfermedad: '001'
  }, {
    ID: 'R27',
    Descripcion: ['102', '103', '104', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R28',
    Descripcion: ['102', '103', '104', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R29',
    Descripcion: ['102', '103', '104', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R30',
    Descripcion: ['103', '104', '105', '106'],
    Enfermedad: '001'
  }, {
    ID: 'R31',
    Descripcion: ['103', '104', '105', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R32',
    Descripcion: ['103', '104', '105', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R33',
    Descripcion: ['103', '104', '105', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R34',
    Descripcion: ['104', '105', '106', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R35',
    Descripcion: ['104', '105', '106', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R36',
    Descripcion: ['104', '105', '106', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R37',
    Descripcion: ['105', '106', '108', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R38',
    Descripcion: ['105', '106', '108', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R39',
    Descripcion: ['106', '108', '110', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R40',
    Descripcion: ['102', '103', '104', '105', '106'],
    Enfermedad: '001'
  }, {
    ID: 'R41',
    Descripcion: ['102', '103', '104', '105', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R42',
    Descripcion: ['102', '103', '104', '105', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R43',
    Descripcion: ['102', '103', '104', '105', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R44',
    Descripcion: ['103', '104', '105', '106', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R45',
    Descripcion: ['103', '104', '105', '106', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R46',
    Descripcion: ['103', '104', '105', '106', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R47',
    Descripcion: ['104', '105', '106', '108', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R48',
    Descripcion: ['104', '105', '106', '108', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R49',
    Descripcion: ['105', '106', '108', '110', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R50',
    Descripcion: ['102', '103', '104', '105', '106', '108'],
    Enfermedad: '001'
  }, {
    ID: 'R51',
    Descripcion: ['102', '103', '104', '105', '106', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R52',
    Descripcion: ['102', '103', '104', '105', '106', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R53',
    Descripcion: ['103', '104', '105', '106', '108', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R54',
    Descripcion: ['103', '104', '105', '106', '108', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R55',
    Descripcion: ['104', '105', '106', '108', '110', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R56',
    Descripcion: ['102', '103', '104', '105', '106', '108', '110'],
    Enfermedad: '001'
  }, {
    ID: 'R57',
    Descripcion: ['102', '103', '104', '105', '106', '108', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R58',
    Descripcion: ['102', '103', '104', '105', '106', '110', '201'],
    Enfermedad: '001'
  }, {
    ID: 'R59',
    Descripcion: ['102', '103', '104', '105', '106', '110', '201'],
    Enfermedad: '001'
  },{
    ID : 'R60',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R61',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R62',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R63',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R64',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R65',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R66',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R67',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R68',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R69',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R70',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R71',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R72',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R73',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R74',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R75',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R76',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R77',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R78',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R79',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R80',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R81',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R82',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R83',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R84',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R85',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R86',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R87',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R88',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R89',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R90',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R91',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R92',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R93',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R94',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R95',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R96',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R97',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R98',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R99',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  },{
    ID : 'R100',
    Descripcion : ['102', '103', '104'],
    Enfermedad:'001'
  } ]*/