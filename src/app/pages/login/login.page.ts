import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route: Router, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  users = JSON.parse(localStorage.getItem('data'));
  usuario = new FormControl('');
  pass = new FormControl('',Validators.required);

  usuarioRecuperado = new FormGroup({
    usuario: new FormControl(''),
    pass: new FormControl('',Validators.required)
  })
  perso: any;


  async usuarioNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Error al Iniciar sesion.',
      subHeader: 'El usuario no existe.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async contraseniaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Error al Iniciar sesion.',
      subHeader: 'El usuario es obligatorio.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }


  
  loginCompleto(usuarioIngresado: String, passIngresada: String){
    for (var i = 0; i < this.users.length; i++) { 
      console.log("this.users[",i,"].usuario",this.users[i].usuario);
      console.log("this.usuarioRecuperado.controls.usuario.value",this.usuarioRecuperado.controls.usuario.value)
      if(this.users[i].usuario == usuarioIngresado && this.users[i].pass == passIngresada){
        console.log("SESION INICIADA")
        localStorage.setItem('usuariotemp', JSON.stringify(usuarioIngresado))
        return true;
      }
      if(this.users[i].pass != passIngresada){
        console.log("Contraseña invalida!")
        this.contraseniaNoExiste();
        return false;
      }
    }
    console.log("Usuario no encontrado.")
    this.usuarioNoExiste();
    return false;
  };

  login(){
    if(this.loginCompleto(this.usuarioRecuperado.controls.usuario.value,this.usuarioRecuperado.controls.pass.value)){
      this.route.navigate(['/sesion-inicada']);

    };
  };

  goHome(){
    this.route.navigate(['/home']);
  }

}
