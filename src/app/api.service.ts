import { Injectable } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection }
              from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map}  from 'rxjs/operators';
import { AlumnoI } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private alumno  : Observable<AlumnoI[]>;
  private alumnoCollection : AngularFirestoreCollection<AlumnoI>;


  constructor( private db: AngularFirestore ) { 
    this.alumnoCollection= db.collection<AlumnoI>('alumno');
    this.alumno= this.alumnoCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(
          a=>{
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return  {id, ...data};


          }
        )
      }
    ));
  }

  //metodo
  //recuperar 
  getTodo(){
    return this.alumno;
  }


}
