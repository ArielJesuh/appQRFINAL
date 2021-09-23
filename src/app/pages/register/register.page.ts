import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  users = JSON.parse(localStorage.getItem('data'));
  usuario = new FormControl('');
  pass = new FormControl('');

  usuarioRecuperado = new FormGroup({
    usuario: new FormControl(''),
    pass: new FormControl('')
  })
  perso: any;

  //MOSTRAR PERSONA  Y ADEMAS LO AÑADE AL ARREGLO DE USUARIOS
  grabar() {
    console.log(this.usuarioRecuperado.value);
    this.perso = {
      usuario: this.usuarioRecuperado.controls.usuario.value,
      pass: this.usuarioRecuperado.controls.pass.value
    };
    this.users.push(this.perso);
    var data = this.users;
    //GUARDAR EN LOCALSTORAGE.
    localStorage.setItem('data', JSON.stringify(data));
  }

  revisarUsuario(nombre: string){
    console.log(this.users);
    if(this.users.length == 0){
      return true;
    }
    for (var i = 0; i < this.users.length; i++) { 
      console.log("Comparamos ")
      console.log("this.users[",i,"]"," = ",this.users[i].usuario);
      console.log("y","nombre: string de funcion revisarUsuario = ",nombre);
      if (this.users[i].usuario === nombre) {
        return false;
      }
    }
    return true;
  }

  registrar() {
    if(this.revisarUsuario(this.usuarioRecuperado.controls.usuario.value)){
      console.log("Intentando registrar usuario.");
      this.grabar()
    }
    else{
      console.log("El usuario ya existe.");
    }
  }

  goForgot(){
    this.route.navigate(['/forgot-p']);
  }

}