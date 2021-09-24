import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public alertCtrl: AlertController,private route: Router) { }

  ngOnInit() {
  }

  users = JSON.parse(localStorage.getItem('data'));
  usuario = new FormControl('',Validators.required);
  pass = new FormControl('',Validators.required);

  usuarioRecuperado = new FormGroup({
    usuario: new FormControl('',Validators.required),
    pass: new FormControl('',Validators.required)
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

  async ingresaUsuario() {
    const alert = await this.alertCtrl.create({
      header: 'Error al registrar.',
      subHeader: 'Ingresa un usuario valido.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  revisarUsuario(nombre: string){
    //SI NO HAY USUARIOS SE PUEDE REGISTRAR
    if(this.usuarioRecuperado.controls.usuario.value != ""){

    }
    if(this.users.length == 0){
      return true;
    }
    //SI HAY USUARIOS
    for (var i = 0; i < this.users.length; i++) { 
      //SI EXISTE UN USUARIO YA REGISTRADO
      if (this.users[i].usuario === nombre ) {
        return false;
      }
    }
    //Si el formulario esta completo
    if(this.usuarioRecuperado.valid){
    return true;
  }
    
  }
  // ALERTA PARA INFORMAR QUE EL USUARIO YA ESTA REGISTRADO
  async usuarioExisteVentana() {
    const alert = await this.alertCtrl.create({
      header: 'Error al registrar.',
      subHeader: 'El usuario ya existe.',
      message: 'Por favor ingresa datos validos.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  async ingresaContrasenia() {
    const alert = await this.alertCtrl.create({
      header: 'Error al registrar.',
      subHeader: 'Ingresa una contraseña valida.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
      // FUNCION PARA GUARDAR USUARIO
  registrar() {
    if(this.revisarUsuario(this.usuarioRecuperado.controls.usuario.value)){
      console.log("Intentando registrar usuario.");
      this.grabar()
    }
    else{
      console.log("El usuario ya existe.");
      if(this.usuarioRecuperado.valid){
        this.usuarioExisteVentana();
        return true;
      }
      else{
        this.ingresaContrasenia();
      }
    }
  }

  goForgot(){
    this.route.navigate(['/forgot-p']);
  }

  goHome(){
    this.route.navigate(['/home']);
  }



}