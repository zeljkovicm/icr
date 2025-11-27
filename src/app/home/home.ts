import { Component, signal } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected movies = signal<MovieModel[]>([])

  constructor() {
    MovieService.getMovies().then(rsp => this.movies.set(rsp.data))
  }
}
