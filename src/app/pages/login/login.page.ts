import { Component, OnInit } from '@angular/core';
import { ProfesorI } from 'src/app/model/profesor';
import { AlumnoI } from 'src/app/model/usuario';
import { ApiService } from 'src/app/api.service';
import { NavController, LoadingController, IonItemOption } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private route: Router, public alertCtrl: AlertController) { }

  ngOnInit() {
  }


  users = JSON.parse(localStorage.getItem('data'));
  user: string;
  password: string;
  usuario = new FormControl('');
  array_alumnos: AlumnoI[]; // recupera todos los alumnos
  array_profesor: ProfesorI[];

  pass = new FormControl('', Validators.required);

  usuarioRecuperado = new FormGroup({
    usuario: new FormControl(''),
    pass: new FormControl('', Validators.required)
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



  loginCompleto(usuarioIngresado: String, passIngresada: String) {
    for (var i = 0; i < this.users.length; i++) {
      console.log("this.users[", i, "].usuario", this.users[i].usuario);
      console.log("this.usuarioRecuperado.controls.usuario.value", this.usuarioRecuperado.controls.usuario.value)
      if (this.users[i].usuario == usuarioIngresado && this.users[i].pass == passIngresada) {
        console.log("SESION INICIADA")
        localStorage.setItem('usuariotemp', JSON.stringify(usuarioIngresado))
        return true;
      }
      if (this.users[i].pass != passIngresada) {
        console.log("Contraseña invalida!")
        this.contraseniaNoExiste();
        return false;
      }
    }
    console.log("Usuario no encontrado.")
    this.usuarioNoExiste();
    return false;
  }

  login() {
    if (this.loginCompleto(this.usuarioRecuperado.controls.usuario.value, this.usuarioRecuperado.controls.pass.value)) {
      this.route.navigate(['/sesion-inicada']);

    };
  }

  validarAlumno() {
    this.api.getTodoAlumnos().subscribe(resp => {
      this.array_alumnos = resp;
      console.log(this.array_alumnos);
      this.array_alumnos.forEach(item => {
        if (item.usuario === this.user && item.password === this.password) {
          console.log("Usuario validado con nivel :" + item.tipo);
          console.log(resp);
          this.logeado(item.tipo);
        }else{
          console.log("te caiste");
        }
      });
    });
  }

  validarProfesor() {
    this.api.getTodoProfesores().subscribe(resp => {
      this.array_profesor = resp;
      this.array_profesor.forEach(item => {
        if (item.usuario == this.user && item.password == this.password) {
          console.log("Usuario validado con nivel :" + item.tipo);
          console.log(resp);
          this.logeado(item.tipo);
        }
      });
    });
  }


  validar(){
    this.validarProfesor();
    this.validarAlumno();

  }

  logeado(nivel: Number) {
    if (nivel > 0) {
      if (nivel == 1) {
        this.navCtrl.navigateForward('/alumno');
      } else {
        this.navCtrl.navigateForward('/profesor');
      }
    }
  }

  goHome() {
    this.route.navigate(['/home']);
  }

}
