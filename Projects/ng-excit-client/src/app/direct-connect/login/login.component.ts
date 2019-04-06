import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PreviewBaseComponent } from '../preview-base.component';
import { DirectConnectService } from '../services/direct-connect.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends PreviewBaseComponent implements OnInit, OnDestroy {
  accountNumber: string;
  username: string;
  password: string;
  status: string;
  private routerSubscription: Subscription;

  constructor(protected directConnectService: DirectConnectService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected deviceService: DeviceDetectorService) {

    super(directConnectService, route, router, deviceService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe  (
      event => {
        this.username = '';
        this.password = '';
        this.accountNumber = '';
        this.status = '';
      }
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  validate(): void {
    this.status = '';
    this.directConnectService.login(this.id, this.username, this.password, this.accountNumber).pipe(
      take(1)
    ).subscribe( output => {
      this.status = output.isValid ? 'valid' : 'invalid';
    });
  }
}
