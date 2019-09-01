import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from '../base-detail.component';
import { DirectConnectService } from '../../services/direct-connect.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.css']
})
export class OrderCreationComponent extends BaseDetailComponent implements OnInit {

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
