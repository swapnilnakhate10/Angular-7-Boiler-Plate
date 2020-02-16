import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { EvaluationConfiguration } from '../../../../models/evaluationConfiguration';
import { UrlDetails } from '../../../../constants/url-details';
import { Success, Error } from '../../../../constants/messages';
import { HttpService } from './../../../shared/services/http.service';
import { StorageService } from './../../../shared/services/storage.service';
import { ToasterService } from './../../../shared/services/toaster.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  @Input() eventId: string;
  @Output() formSubmit = new EventEmitter<Event>();

  configuration: EvaluationConfiguration;
  evaluations = [];
  judgesList = [];
  configForm;

  constructor(private httpService: HttpService, private toaster:ToasterService) {
    this.configForm = new FormGroup({
      parameter: new FormControl('', Validators.required),
      maxScore: new FormControl('', Validators.required),
      judge: new FormControl('', Validators.required),
      weightage: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getAllJudges();
  }

  getAllJudges() {
    this.httpService.get(UrlDetails.judges).subscribe((response) => {
      this.getAllJudgesSuccess(response);
    }, (error)=> {
      this.getAllJudgesError(error);
    });
  }

  getAllJudgesSuccess(response){
    this.judgesList = response;
  }

  getAllJudgesError(response){
    this.toaster.showError('Error getting judges list.');
  }

  selectJudge(event) {
    console.log('Selceted Judge : '+event);
  }

  addEvaluationConfiguration(evaluationData: EvaluationConfiguration) {
    const updatedBody = { evaluation : evaluationData };
    this.httpService.put(UrlDetails.events + this.eventId, updatedBody).subscribe((response) => {
      this.addEvaluationConfigurationSuccess(response);
    }, (error)=> {
      this.addEvaluationConfigurationError(error);
    });
  }

  addEvaluationConfigurationSuccess(data) {
    this.toaster.showSuccess("Updated evaluation configuration");
    this.configForm.emit(data);
  }

  addEvaluationConfigurationError(error) {
    this.toaster.showError(Error.createEvent);
  }

}
