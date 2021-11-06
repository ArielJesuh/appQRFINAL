import { Component, OnInit } from '@angular/core';
import {alumnoI} from '../model/persona.interface';
import {PersonaService} from '../alumno.service;'
import { AlumnoI } from '../model/alumno.interface';
import { AlumnoService } from 'src/app/alumno.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  alumno : AlumnoI[];

  constructor(private alumnoServ: AlumnoService){}

  ngOnInit() :void
  this.alumnoServ.getPersonas().suscribe( resp=>{
    this.alumno = resp;
  });
  }

}
