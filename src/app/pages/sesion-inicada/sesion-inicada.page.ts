import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sesion-inicada',
  templateUrl: './sesion-inicada.page.html',
  styleUrls: ['./sesion-inicada.page.scss'],
})
export class SesionInicadaPage implements OnInit {

  constructor(public alertCtrl: AlertController,private route: Router) { }

  ngOnInit() {
  }

  async handleButtonClick() {
    const alert = await this.alertCtrl.create({
      header: 'ACTIVA TU CAMARA',
      subHeader: 'Para utilizar esta aplicacion debes tener activada tu camara.',
      //message: 'Lo sentimos...',--->
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  goHome(){
    this.route.navigate(['/home']);
  }


}
