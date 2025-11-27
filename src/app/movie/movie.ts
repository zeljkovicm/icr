import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  imports: [RouterLinkWithHref],
  templateUrl: './movie.html',
  styleUrl: './movie.css',
})
export class Movie {
  protected movie = signal<MovieModel | null>(null)

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(p => {
      if (p['path']) {
        MovieService.getMovieByPermalink(p['path']).then(rsp => this.movie.set(rsp.data))
      }
    })
  }
}
