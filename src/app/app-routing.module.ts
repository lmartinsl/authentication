import { AuthGuardService } from './modules/auth/services/auth-guard.service';
import { importType } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main/people' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
