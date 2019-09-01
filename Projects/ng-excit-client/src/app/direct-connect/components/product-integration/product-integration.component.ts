import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from '../base-detail.component';
import { DirectConnectService } from '../../services/direct-connect.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-integration',
  templateUrl: './product-integration.component.html',
  styleUrls: ['./product-integration.component.css']
})
export class ProductIntegrationComponent extends BaseDetailComponent implements OnInit {

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
