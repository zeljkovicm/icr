import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  protected activeUser = signal<UserModel | null>(null)

  constructor(private router: Router) {
    if (!UserService.hasAuth()) {
      localStorage.setItem(UserService.TO_KEY, '/profile')
      router.navigateByUrl('/login')
      return
    }

    this.activeUser.set(UserService.getActiveUser())
  }
}
