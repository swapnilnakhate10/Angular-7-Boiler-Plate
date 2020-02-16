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
  keyword = 'email';

  configuration: EvaluationConfiguration;
  evaluations = [];
  judgesList = [];
  configForm;

  constructor(private httpService: HttpService, private toaster:ToasterService) {
    this.configForm = new FormGroup({
      parameter: new FormControl('', Validators.required),
      maxScore: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
      judge: new FormControl('', Validators.required),
      weightage: new FormControl('', [Validators.required, Validators.max(100), Validators.min(1)])
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
    this.configForm.patchValue({ judge: event._id });
  }

  addEvaluation(evaluationData: EvaluationConfiguration) {
    if(this.configForm.valid) {
      evaluationData.score = 0;
      this.evaluations.push(evaluationData);
      this.configuration = new EvaluationConfiguration();
    } else {
      this.toaster.showError('Please add valid details');
    }
  }

  addEvaluationConfiguration() {
    if(this.evaluations.length > 0) {
      const updatedBody = { evaluationConfiguration : this.evaluations };
      this.httpService.put(UrlDetails.events + this.eventId, updatedBody).subscribe((response) => {
        this.addEvaluationConfigurationSuccess(response);
      }, (error)=> {
        this.addEvaluationConfigurationError(error);
      });  
    } else {
      this.toaster.showError("Please add at least one configuration.");
    }
  }

  addEvaluationConfigurationSuccess(data) {
    this.toaster.showSuccess("Updated evaluation configuration");
    this.formSubmit.emit(data);
  }

  addEvaluationConfigurationError(error) {
    this.toaster.showError(Error.createEvent);
  }

}
