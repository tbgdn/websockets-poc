import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MarcoPoloComponent} from "./marco-polo/marco-polo.component";
import {MarcoPoloSockjsComponent} from "./marco-polo-sockjs/marco-polo-sockjs.component";


const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'marco-polo', component: MarcoPoloComponent
  },
  {
    path: 'marco-polo-sockjs', component: MarcoPoloSockjsComponent
  },
  {
    path: '**', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
