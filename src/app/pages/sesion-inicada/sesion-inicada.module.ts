import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SesionInicadaPageRoutingModule } from './sesion-inicada-routing.module';

import { SesionInicadaPage } from './sesion-inicada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SesionInicadaPageRoutingModule
  ],
  declarations: [SesionInicadaPage]
})
export class SesionInicadaPageModule {}
