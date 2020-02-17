import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  options: any;

  constructor(private toastr: ToastrManager) {
    this.options =  { position: 'bottom-right' , showCloseButton : true};
  }

  showSuccess(message) {
    this.toastr.successToastr(message, 'Success !', this.options);
     this.removToaster();
  }

  showError(message) {
    this.toastr.errorToastr(message, 'Oops !', this.options);
    this.removToaster();
  }

  showWarning(message) {
    this.toastr.warningToastr(message, 'Alert !', this.options);
    this.removToaster();
  }

  showInfo(message) {
    this.toastr.infoToastr(message, 'Info', this.options);
    this.removToaster();
  }
  removToaster() {
    setTimeout(() => {
      this.toastr.dismissAllToastr();
    }, 2000
    );

  }


}
