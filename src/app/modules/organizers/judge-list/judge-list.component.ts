import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-judge-list',
  templateUrl: './judge-list.component.html',
  styleUrls: ['./judge-list.component.scss']
})
export class JudgeListComponent implements OnInit {

  judges = [];
  organizationId : any;

  constructor(private router: Router,
    private httpService: HttpService,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.organizationId = StorageService.get(StorageService.ORGANIZER_ID);
    this.getAllJudges(this.organizationId);
  }

  getAllJudges(organizationId) {
    this.httpService.get(UrlDetails.judges).subscribe((response) =>{
      this.getAllJudgesSuccess(response);
    }, (error)=> {
      this.getAllJudgesError(error);
    });
  }

  getAllJudgesSuccess(response) {
    this.judges = response;
  }

  getAllJudgesError(error) {
    this.toaster.showError(Error.login);
  }

}
