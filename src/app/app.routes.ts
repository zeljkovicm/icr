import { Routes } from '@angular/router';
import { About } from './about/about';
import { Details } from './details/details';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path: '', title: 'Home', component: Home },
    { path: 'about', title: 'About', component: About },
    { path: 'login', title: 'Login', component: Login },
    { path: 'signup', title: 'Signup', component: Signup },
    { path: 'details/:id', title: 'Details', component: Details },
    { path: '**', redirectTo: '' },
];
