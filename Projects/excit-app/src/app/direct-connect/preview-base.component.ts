import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DirectConnectService } from './services/direct-connect.service';
import { SupplierConfig } from './models/config/supplierConfig.model';
import { DeviceDetectorService } from 'ngx-device-detector';

export class PreviewBaseComponent implements OnInit, OnDestroy {
  id: number;
  name: string;
  supplierConfig: SupplierConfig;
  isMobile = false;
  private subscriber: Subscription;

  constructor(protected directConnectService: DirectConnectService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected deviceService: DeviceDetectorService) {

      this.isMobile = deviceService.isMobile();
    }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.name = params['name'];
      const temp = this.directConnectService.getConfig(this.id).subscribe( config => {
        this.supplierConfig = config;
        temp.unsubscribe();
        this.onConfigLoaded();
      });
   });
  }

  onConfigLoaded() {
    // nothing yet
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  close() {
    this.router.navigate(['']);
  }
}
