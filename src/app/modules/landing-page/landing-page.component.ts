import { Component, OnInit } from '@angular/core';
import { ToasterService } from './../shared/services/toaster.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private toastr: ToasterService) { }

  ngOnInit() {
    this.toastr.showSuccess("Iniatiated Project");
  }

}
