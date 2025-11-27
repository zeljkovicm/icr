import axios from "axios";

export class MovieService {
    static async getMovies(search: string = '') {
        return axios.get(`https://movie.pequla.com/api/movie?search=${search}`)
    }
}