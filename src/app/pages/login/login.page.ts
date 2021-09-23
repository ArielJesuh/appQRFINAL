import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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


  
  loginCompleto(usuarioIngresado: String, passIngresada: String){
    for (var i = 0; i < this.users.length; i++) { 
      console.log("this.users[",i,"].usuario",this.users[i].usuario);
      console.log("this.usuarioRecuperado.controls.usuario.value",this.usuarioRecuperado.controls.usuario.value)
      if(this.users[i].usuario == usuarioIngresado && this.users[i].pass == passIngresada){
        console.log("SESION INICIADA")
        localStorage.setItem('usuariotemp', JSON.stringify(usuarioIngresado))
        return true;
      }
    }
    console.log("Usuario no encontrado.")
    return false;
  };

  login(){
    this.loginCompleto(this.usuarioRecuperado.controls.usuario.value,this.usuarioRecuperado.controls.pass.value);
    this.route.navigate(['/sesion-inicada']);
  };

  goHome(){
    this.route.navigate(['/home']);
  }

}
