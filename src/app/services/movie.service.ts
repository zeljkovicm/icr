import axios from "axios";

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ICR/2025'
    }
})

export class MovieService {
    static async getMovies(search: string = '') {
        return client.get(`https://movie.pequla.com/api/movie?search=${search}`)
    }
}