import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, docData } from '@angular/fire/firestore';
import { MdlRules } from 'src/app/Interfaces/MdlRules';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private firestore : Firestore) { }

  addRules(data : MdlRules){
    const ref = collection(this.firestore, 'RULES');
   return addDoc(ref, data);
  }

  async getRulesContains(data: string[]) {
    const ref = collection(this.firestore, 'RULES');
    const q = query(ref,
      where('Descripcion', '==', data));
      const docs = await getDocs(q)
      let  datas :MdlRules[] = [];
      docs.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        datas.push((<MdlRules>doc.data()));
    });
     
    return datas ;
  }

}
