import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { MdlEnfermedad } from 'src/app/Interfaces/MdlEnfermedad';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  constructor(private firestore: Firestore) { }
  addEnfermedad(data : MdlEnfermedad){
    const ref = collection(this.firestore, 'ENFERMEDADES');
   return addDoc(ref, data);
  }

  async getEnfermedadId(data: string): Promise<MdlEnfermedad[]> {
    const ref = collection(this.firestore, 'ENFERMEDADES');
    const q = query(ref,
      where('ID', '==', data));
      const docs = await getDocs(q)
      let  datas :MdlEnfermedad[] = [];
      docs.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        datas.push((<MdlEnfermedad>doc.data()));
    });
     
    return datas ;
  }

  async getEnfermedadIds(data: string[]): Promise<MdlEnfermedad[]> {
    return new Promise(resolve => {
      let enfermedades:  Array<MdlEnfermedad> = [];
      data.forEach(async (element) => {
        const ref = collection(this.firestore, 'ENFERMEDADES');
        const q = query(ref,
          where('ID', '==', element));
          const docs = await getDocs(q)
          let  datas :MdlEnfermedad[] = [];
          docs.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            datas.push((<MdlEnfermedad>doc.data()));
        });
         console.log('datas data' , element, datas);
         
        enfermedades.push(datas[0]);
         
      })
      console.log('enfermedades', enfermedades);
      
      resolve(enfermedades);

    });
   
  }
}
