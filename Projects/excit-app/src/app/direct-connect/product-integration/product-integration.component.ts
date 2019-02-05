import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewBaseComponent } from '../preview-base.component';
import { DirectConnectService } from '../services/direct-connect.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-product-integration',
  templateUrl: './product-integration.component.html',
  styleUrls: ['./product-integration.component.css']
})
export class ProductIntegrationComponent extends PreviewBaseComponent implements OnInit, OnDestroy {

  constructor(protected directConnectService: DirectConnectService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected deviceService: DeviceDetectorService) {

    super(directConnectService, route, router, deviceService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
