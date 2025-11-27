import { Component, signal } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected movies = signal<any>(null)

  constructor() {
    MovieService.getMovies().then(rsp => this.movies.set(JSON.stringify(rsp.data, null, 2)))
  }
}
