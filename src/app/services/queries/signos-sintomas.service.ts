import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface MdlSignosSintomas {
  Descripcion: string;
  ID: string
  order:number
}
@Injectable({
  providedIn: 'root'
})
export class SignosSintomasService {

  constructor(private firestore : Firestore) { }

  getSintomas ():Observable<MdlSignosSintomas[]>{
   const ref = collection(this.firestore,'/SIGNOS_SINTOMAS')
    return collectionData(ref,{idField:'ID'}) as Observable<MdlSignosSintomas[]>
  }
}
