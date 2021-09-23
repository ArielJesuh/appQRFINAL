import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-p',
  templateUrl: './forgot-p.page.html',
  styleUrls: ['./forgot-p.page.scss'],
})
export class ForgotPPage implements OnInit {

  constructor(public alertCtrl: AlertController,private route: Router) { }

  ngOnInit() {
  }

  users = JSON.parse(localStorage.getItem('data'));

  usuarioRecAux :any;

  usuario = new FormControl('');
  pass = new FormControl('');

  usuarioRecuperado = new FormGroup({
    usuario: new FormControl(''),
    pass: new FormControl('')
  })

  listar() {

    console.log(localStorage.getItem('data'));
  }

  revisarUsuario(nombre: string){
    console.log("users = ",this.users);
    console.log("users[0] = ",this.users[0]);

    for (var i = 0; i < this.users.length; i++) {
      console.log("Comparamos ")
      console.log("this.users[",i,"]"," = ",this.users[i].usuario);
      console.log("y","nombre: string de funcion revisarUsuario = ",nombre);
      if (this.users[i].usuario === nombre) {
        return true;
      }
    }
  }

  getPasswordFromUser(nombre: string) {
    for (var i = 0; i < this.users.length; i++) {
      console.log("Comparamos ")
      console.log("this.users[",i,"]"," = ",this.users[i].usuario);
      console.log("y","nombre: string de funcion getPasswordFromUser = ",nombre);
      if (this.users[i].usuario === nombre) {
        console.log("retornamos password :",this.users[i].pass)
        return this.users[i].pass;
      }
    }
  }

  recuperarContrasena(nombre: string) {
    //console.log(JSON.parse(this.users));
    if(this.revisarUsuario(nombre)){
      console.log(this.getPasswordFromUser(nombre));
      console.log("entre"); 
    }
  }

  grabar() {
    console.log("this.users = ",this.users)
    this.usuarioRecAux = {
      nombre: this.usuarioRecuperado.controls.usuario.value,
      pass: this.usuarioRecuperado.controls.pass.value
    };
    // GUARDAR EN LOCALSTORAGE.
    localStorage.setItem('usuariotemp', JSON.stringify(this.usuarioRecAux.nombre));
    console.log("usuariorecaux",this.usuarioRecAux.nombre);

    console.log("contra recuperada:",this.recuperarContrasena(this.usuarioRecAux.nombre));
  }

  async handleButtonClick() {
    const alert = await this.alertCtrl.create({
      header: 'Recuperar contraseña',
      subHeader: 'Su contraseña es',
      message: this.getPasswordFromUser(this.usuarioRecuperado.controls.usuario.value),
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  goHome(){
    this.route.navigate(['/home']);
  }


}
