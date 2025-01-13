import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.component').then(load => load.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(load => load.LoginComponent)
  },
  {
    path: 'currencies',
    loadComponent: () => import('./currencies/currencies.component').then(load => load.CurrenciesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.component').then(load => load.ExploreComponent),
    canActivate: [AuthGuard]
  }
]
