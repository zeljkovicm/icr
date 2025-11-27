export interface OrderModel {
    orderId: string
    movieId: number
    cinema: string
    hall: string
    quantity: number
    price: number
    status: 'na' | 'paid' | 'canceled' | 'liked' | 'disliked'
}