export interface OrderModel {
    orderId: string
    movieId: number
    movieTitle: string
    cinema: string
    hall: string
    quantity: number
    time: string
    status: 'na' | 'paid' | 'canceled' | 'liked' | 'disliked'
}