import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { LandingComponent } from './components/landing/landing.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToChat = () => redirectLoggedInTo(['chat']);

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: 'chat',
    component: LayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];
