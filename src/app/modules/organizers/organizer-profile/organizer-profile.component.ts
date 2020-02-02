import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.scss']
})
export class OrganizerProfileComponent implements OnInit {


  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) { }

    organizerDetails={};
  ngOnInit() {
    if(StorageService.get("isLoggedIn")){
      this.organizerDetails={ 
        _id: StorageService.get(StorageService.ORGANIZER_ID),
        name: StorageService.get(StorageService.ORGANIZER_NAME),
        organization:StorageService.get(StorageService.CURRENT_ORGANIZATION_NAME),
        email:StorageService.get(StorageService.ORGANIZER_EMAIL),
        contactNo :StorageService.get(StorageService.ORGANIZER_CONTACT),
        type : StorageService.get(StorageService.USER_TYPE)
      }
    }else {
      StorageService.removeAll();
      this.router.navigateByUrl('/');
    }  
  }

}
