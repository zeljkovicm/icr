// Logika

import { throwError } from "rxjs";
import { UserModel } from "../models/user.model";

export class UserService {
    // f-ja koja ce dopremiti spisak svih korsnika iz localStorage

    static getUsers(): UserModel[] {
        if (!localStorage.getItem('icr_users')) {
            localStorage.setItem('icr_users', JSON.stringify([
                {
                    firstName: "Example",
                    lastName: "User",
                    email: "user@example.com",
                    phone: "+38163230",
                    password: "user123",
                    data: []
                }
            ]))
        }// mora se paziti sta ima u localStorage, mogu postojati iste vrednosti, moze se promeniti i port

        return JSON.parse(localStorage.getItem('icr_users')!)
    }

    static findUserByEmail(email: string) {
        const users = this.getUsers()
        const selectedUser = users.find(u => u.email === email)

        if (!selectedUser)
            throw new Error('USER_NOT_FOUND')

        return selectedUser
    }

    static login(email: string, password: string) {
        try {
            const user = this.findUserByEmail(email)
            return user.password === password
        } catch {
            return false
        }

    }
}

