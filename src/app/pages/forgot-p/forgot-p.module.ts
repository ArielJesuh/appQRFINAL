import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPPageRoutingModule } from './forgot-p-routing.module';

import { ForgotPPage } from './forgot-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [ForgotPPage]
})
export class ForgotPPageModule {}
