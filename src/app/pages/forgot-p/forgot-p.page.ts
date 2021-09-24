import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-p',
  templateUrl: './forgot-p.page.html',
  styleUrls: ['./forgot-p.page.scss'],
})
export class ForgotPPage implements OnInit {

  constructor(public alertCtrl: AlertController, private route: Router) { }

  ngOnInit() {
  }

  //Guardamos data del local storage en la variable users
  users = JSON.parse(localStorage.getItem('data'));

  //Creamos una variable auxiliar para poder guardar nuestros valores de formulario en una formgroup
  usuarioRecAux: any;

  //creamos los formControl de usuario y pass
  usuario = new FormControl('', Validators.required);
  pass = new FormControl('');

  //creamos el formGroup del usuarioRecuperado
  usuarioRecuperado = new FormGroup({
    usuario: new FormControl('',Validators.required),
    pass: new FormControl('')
  })

  //Funcion de desarrollo para ver que contiene data.
  listar() {
    console.log(localStorage.getItem('data'));
  }

  //Funcion que resive de entrada un string (nombre)
  //y nos regresa true si el nombre ingresado es igual a un usuario en la lista de usuarios
  revisarUsuario(nombre: string) {
    //console.log("users = ",this.users);
    //console.log("users[0] = ",this.users[0]);
    for (var i = 0; i < this.users.length; i++) {
      //console.log("Comparamos ")
      //console.log("this.users[",i,"]"," = ",this.users[i].usuario);
      //console.log("y","nombre: string de funcion revisarUsuario = ",nombre);
      if (this.users[i].usuario === nombre) {
        return true;
      }
    }
  }

  getPasswordFromUser(nombre: string) {
    for (var i = 0; i < this.users.length; i++) {
      console.log("Comparamos ")
      console.log("this.users[", i, "]", " = ", this.users[i].usuario);
      console.log("y", "nombre: string de funcion getPasswordFromUser = ", nombre);
      if (this.users[i].usuario === nombre) {
        console.log("retornamos password :", this.users[i].pass)
        return this.users[i].pass;
      }
      else {



      }
    }
  }

  recuperarContrasena(nombre: string) {
    //console.log(JSON.parse(this.users));
    if (this.revisarUsuario(nombre)) {
      console.log(this.getPasswordFromUser(nombre));
      console.log("entre");
    }
  }

  grabar() {
    console.log("this.users = ", this.users)
    this.usuarioRecAux = {
      nombre: this.usuarioRecuperado.controls.usuario.value,
      pass: this.usuarioRecuperado.controls.pass.value
    };
    // GUARDAR EN LOCALSTORAGE.
    localStorage.setItem('usuariotemp', JSON.stringify(this.usuarioRecAux.nombre));

  }

  async handleButtonClick() {
    this.grabar();
    if (this.usuarioRecuperado.valid) {
      const alert = await this.alertCtrl.create({
        header: 'Recuperar contraseña',
        subHeader: 'Su contraseña es',
        message: this.getPasswordFromUser(this.usuarioRecuperado.controls.usuario.value),
        buttons: ['Aceptar']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error al recuperar contraseña.',
        subHeader: 'Debe ingresar un usuario valido.',
        //message: this.getPasswordFromUser(this.usuarioRecuperado.controls.usuario.value),
        buttons: ['Aceptar']
      });
      await alert.present();      
    }
  }

  goHome() {
    this.route.navigate(['/home']);
  }


}
