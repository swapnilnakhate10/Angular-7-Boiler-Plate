import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../../../../models/event';
import { UrlDetails } from '../../../../constants/url-details';
import { Success, Error } from '../../../../constants/messages';
import { HttpService } from './../../../shared/services/http.service';
import { StorageService } from './../../../shared/services/storage.service';
import { ToasterService } from './../../../shared/services/toaster.service';

@Component({
  selector: 'app-prize-form',
  templateUrl: './prize-form.component.html',
  styleUrls: ['./prize-form.component.scss']
})
export class PrizeFormComponent implements OnInit {

  @Input() eventId: any;
  prizeForm;
  prizeModels = [];

  constructor(private httpService: HttpService, private toaster: ToasterService,
              private router: Router) { }

  ngOnInit() {
    this.prizeForm = new FormGroup({
      rank: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
    console.log('Curent event id : '+this.eventId);
    // this.eventId = "5e36f5b0c11241398498c87c";
    this.getEventPrizesList(this.eventId);
  }

  getEventPrizesList(eventId) {
    this.httpService.get(UrlDetails.prizes +'event/'+eventId).subscribe((response) => {
      this.getEventDataSuccess(response);
    }, (error)=> {
      this.getEventDataError(error);
    });
  }

  getEventDataSuccess(data) {
    this.prizeModels = data;
  }

  getEventDataError(error) {
    this.toaster.showError(Error.getEvent);
  }
  
  submitPrizeData(prizeData: any) {
    prizeData.eventId = this.eventId;
    this.httpService.post(UrlDetails.prizes, prizeData).subscribe((response) => {
      this.addOrUpdateEventSuccess(response);
    }, (error)=> {
      this.addOrUpdateEventError(error);
    });
  }

  addOrUpdateEventSuccess(data) {
    this.toaster.showSuccess(Success.createEvent);
    this.getEventPrizesList(this.eventId);
  }

  addOrUpdateEventError(error) {
    this.toaster.showError(Error.createEvent);
  }

  submitPrizes() {
    this.router.navigateByUrl('organizer');
  }

}
