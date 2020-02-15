import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-judge-form',
  templateUrl: './judge-form.component.html',
  styleUrls: ['./judge-form.component.scss']
})
export class JudgeFormComponent implements OnInit {

  judgeForm;
  isVisiblePassword:boolean = false;
  organizationId : any;

  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) {
    this.judgeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      contactNo: new FormControl(''),
      specialization: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.organizationId = StorageService.get(StorageService.ORGANIZER_ID);
  }

  showPassword(password){
      this.isVisiblePassword = !this.isVisiblePassword;
     password.type = this.isVisiblePassword? "text":"password";
  }

  addJudge(data) {
    data.createdBy = this.organizationId;
    this.httpService.post(UrlDetails.judges, data).subscribe((response) => {
      this.addJudgeSuccess(response);
    }, (error) => {
      this.addJudgeError(error);
    });
  }

  addJudgeSuccess(response) {
    this.toaster.showSuccess("Judge registered successfully.");
  }

  addJudgeError(error) {
    this.toaster.showError(error.errmsg);
  }

}
