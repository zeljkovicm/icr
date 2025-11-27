import { Component, signal } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { RouterLinkWithHref } from "@angular/router";
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { FormsModule } from "@angular/forms"

@Component({
  selector: 'app-home',
  imports: [RouterLinkWithHref, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected movies = signal<MovieModel[]>([])
  protected previousSerach = 'N/A'
  protected search = ''
  constructor() {
    this.loadMovies()
  }

  protected loadMovies() {
    if (this.previousSerach == '' && this.search == '')
      return

    this.previousSerach = this.search
    MovieService.getMovies(this.search).then(rsp => this.movies.set(rsp.data))
  }
}
