import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { UrlDetails } from 'src/app/constants/url-details';
import { ToasterService } from '../../shared/services/toaster.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private httpService: HttpService,
    private toaster: ToasterService ) { }

  ngOnInit() { }

  onSubmitEventForm(data) {
    console.log('Creating event : '+JSON.stringify(data));
  }

}
