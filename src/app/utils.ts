import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class Utils {

  public bootstrapClasses = {
    popup: 'card',
    cancelButton: 'btn btn-danger',
    denyButton: 'btn btn-secondary',
    confirmButton: 'btn btn-primary'
  }
  public showDialog(text: string, callback: Function, confirm: string = 'Yes', cancel: string = 'No') {
    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonText: confirm,
      cancelButtonText: cancel,
      customClass: this.bootstrapClasses
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
      }
    })
  }
}
