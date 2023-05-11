import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MdlSignosSintomas } from '../../Interfaces/MdlSignosSintomas';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignosSintomasService {

  constructor(private firestore : Firestore) { }

  getSintomas ():Observable<MdlSignosSintomas[]>{
   const ref = collection(this.firestore,'SIGNOS_SINTOMAS')
    return collectionData(ref,{idField:'IDDocument'}) as Observable<MdlSignosSintomas[]>
  }

  addSintomas(data : MdlSignosSintomas){
    const ref = collection(this.firestore, 'SIGNOS_SINTOMAS');
   return addDoc(ref, data);
  }
}
