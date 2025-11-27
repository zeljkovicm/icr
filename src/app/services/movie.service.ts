import axios from "axios";

export class MovieService {
    static async getMovies() {
        return axios.get('https://movie.pequla.com/api/movie')
    }
}