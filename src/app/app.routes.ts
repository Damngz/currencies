import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(load => load.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(load => load.HomeComponent)
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
