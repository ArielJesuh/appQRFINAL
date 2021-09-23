import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SesionInicadaPage } from './sesion-inicada.page';

const routes: Routes = [
  {
    path: '',
    component: SesionInicadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionInicadaPageRoutingModule {}
