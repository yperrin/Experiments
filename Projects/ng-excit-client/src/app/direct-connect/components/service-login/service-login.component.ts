import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from '../base-detail.component';
import { DirectConnectService } from '../../services/direct-connect.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-login',
  templateUrl: './service-login.component.html',
  styleUrls: ['./service-login.component.css']
})
export class ServiceLoginComponent extends BaseDetailComponent implements OnInit {

  constructor(
    protected directConnectService: DirectConnectService,
    protected route: ActivatedRoute,
    protected router: Router) {
      super(directConnectService, route, router);
    }

  ngOnInit() {
    super.ngOnInit();
  }
}
