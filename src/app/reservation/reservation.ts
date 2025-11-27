import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reservation',
  imports: [RouterLinkWithHref, RouterLink, ReactiveFormsModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation {
  protected movie = signal<MovieModel | null>(null)

  protected form: FormGroup

  constructor(private route: ActivatedRoute, private router: Router, private builder: FormBuilder) {
    this.route.params.subscribe(p => {
      if (p['path']) {
        const shortUrl = p['path']
        if (!UserService.hasAuth()) {
          localStorage.setItem(UserService.TO_KEY, `/movie/${shortUrl}/reservation`)
          router.navigateByUrl('/login')
          return
        }
        MovieService.getMovieByPermalink(p['path']).then(rsp => this.movie.set(rsp.data))
      }
    })
    this.form = this.builder.group({
      time: ['Petak 22h', Validators.required],
      cinema: ['Ada', Validators.required],
      hall: ['Velika', Validators.required],
      quantity: [1, Validators.required]
    })
  }

  protected onSubmit() {

  }
}
