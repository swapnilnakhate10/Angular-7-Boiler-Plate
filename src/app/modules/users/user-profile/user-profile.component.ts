import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) { }

  userDetails = {};
  ngOnInit() {

    if (StorageService.get("isLoggedIn")) {
      this.userDetails = {
        firstName: StorageService.get(StorageService.USER_FIRSTNAME),
        lastName: StorageService.get(StorageService.USER_LASTNAME),
        email: StorageService.get(StorageService.USER_EMAIL),
        type: StorageService.get(StorageService.USER_TYPE),
        designation: StorageService.get(StorageService.USER_DESIGNATION)
        
      }
    } else {
      StorageService.removeAll();
      this.router.navigateByUrl('/');
    }
  }

}
