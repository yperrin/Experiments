import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewBaseComponent } from '../preview-base.component';
import { DirectConnectService } from '../services/direct-connect.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent extends PreviewBaseComponent implements OnInit {

  constructor(protected directConnectService: DirectConnectService, protected route: ActivatedRoute, protected router: Router) {
    super(directConnectService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
