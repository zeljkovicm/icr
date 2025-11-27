import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order.model';
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
  protected statusMap = {
    'na': 'Waiting',
    'paid': 'Paid',
    'canceled': 'Canceled',
    'liked': 'Positive Rating',
    'disliked': 'Negative Rating'
  }

  constructor(private router: Router) {
    if (!UserService.hasAuth()) {
      localStorage.setItem(UserService.TO_KEY, '/profile')
      router.navigateByUrl('/login')
      return
    }

    this.activeUser.set(UserService.getActiveUser())
  }

  protected pay(order: OrderModel) {
    UserService.updateOrder(order.orderId, 'paid')
    this.activeUser.set(UserService.getActiveUser())
  }

  protected cancel(order: OrderModel) {
    UserService.updateOrder(order.orderId, 'canceled')
    this.activeUser.set(UserService.getActiveUser())
  }

  protected like(order: OrderModel) {
    UserService.updateOrder(order.orderId, 'liked')
    this.activeUser.set(UserService.getActiveUser())
  }

  protected dislike(order: OrderModel) {
    UserService.updateOrder(order.orderId, 'disliked')
    this.activeUser.set(UserService.getActiveUser())
  }
}
