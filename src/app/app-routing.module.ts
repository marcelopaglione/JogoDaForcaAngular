import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoJogoComponent } from './components/forca/novo-jogo/novo-jogo.component';
import { MainComponent } from './components/forca/main/main.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/novoJogo' },
  { path: 'novoJogo', component: NovoJogoComponent},
  { path: 'home', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
