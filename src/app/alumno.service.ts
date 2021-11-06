import { Injectable } from '@angular/core';
/*¨librerias*/
import { AngularFirestore , AngularFirestoreCollection }
 from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {AlumnoI } from './model/alumno.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private alumnoCollection : AngularFirestoreCollection<AlumnoI>;
  private alumnos : Observable<AlumnoI[]>;

  constructor( db : AngularFirestore) {
    this.alumnoCollection = db.collection<AlumnoI>('alumno');
    this.alumnos = this.alumnoCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a=>{
            const id= a.payload.doc.id;
            const datos = a.payload.doc.data();
            return { id, ...datos};
          });
        }
      )
    );
   }
  
  }

//crud

// todos los alumnos
getAlumno(){
  return this.alumno;
}
// recupera un alumno por ID
getAlumno(id:string){
  return this.alumnoCollection.doc<AlumnoI>(id).valueChanges();
}
// agregara firebase
addAlumno(alumno: AlumnoI){
return this.alumnoCollection.add(alumno);
  }


