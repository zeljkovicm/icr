import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from './services/user.service';
import { Utils } from './utils';
import { MessageModel } from './models/message.model';
import { throwIfEmpty } from 'rxjs';
import { RasaService } from './services/rasa.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected year = new Date().getFullYear()
  protected isChatVisible: boolean = false
  protected waitingForResponse: boolean = false
  protected botThinkingPlaceHolder: string = "Thinking..."
  protected userMessage: string = ""
  protected messages: MessageModel[] = []

  constructor(private router: Router, private utils: Utils) {
    this.messages.push({
      type: 'bot',
      text: 'How can I help you?'
    })
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible
  }

  sendUserMessage() {
    if (this.waitingForResponse) return

    const trimmedMessage = this.userMessage.trim()
    this.userMessage = ""

    this.messages.push({
      type: 'user',
      text: trimmedMessage
    })

    this.messages.push({
      type: 'bot',
      text: this.botThinkingPlaceHolder
    })

    RasaService.sendMessage(trimmedMessage).then(rsp => {
      if (rsp.data.length == 0) {
        this.messages.push({
          type: 'bot',
          text: "Sorry, I didn't understand your question."
        })
        return
      }

      for (let message of rsp.data) {
        this.messages.push({
          type: 'bot',
          text: message.text
        })
      }

      this.messages = this.messages.filter(m => {
        if (m.type == 'bot') {
          return m.text != this.botThinkingPlaceHolder
        }
        return true
      })

    })

  }

  getUserName() {
    const user = UserService.getActiveUser()
    return `${user.firstName} ${user.lastName}`
  }

  hasAuth() {
    return UserService.hasAuth()
  }

  doLogout() {
    this.utils.showDialog("Are you sure you want to logout?", () => {
      UserService.logout()
      this.router.navigateByUrl('/login')
    },
      "Logout Now",
      "Don't Logout"
    )
  }
}
