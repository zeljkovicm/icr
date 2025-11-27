import { Routes } from '@angular/router';
import { About } from './about/about';
import { Home } from './home/home';
import { Login } from './login/login';
import { Movie } from './movie/movie';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path: '', title: 'Home', component: Home },
    { path: 'about', title: 'About', component: About },
    { path: 'login', title: 'Login', component: Login },
    { path: 'signup', title: 'Signup', component: Signup },
    { path: 'movie/:path', title: 'Movie', component: Movie },
    { path: '**', redirectTo: '' },
];
