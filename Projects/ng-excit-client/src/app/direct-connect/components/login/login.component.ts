import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SupplierConfigModel } from '../../models/config/supplierConfig.model';
import { DirectConnectService } from '../../services/direct-connect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BaseDetailComponent } from '../base-detail.component';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginOutputModel } from '../../models/output/login/login-output.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseDetailComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  supplierConfig$: Observable<SupplierConfigModel>;
  loginOutput$ = new Observable<LoginOutputModel>();
  loginForm = this.fb.group({
    supplierId: [0],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    protected directConnectService: DirectConnectService,
    protected route: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder) {
      super(directConnectService, route, router);

      this.subscriptions.push(this.loginForm.valueChanges.pipe(
        tap(() => this.resetLoginStatus())
      ).subscribe());
    }

  ngOnInit() {
    super.ngOnInit();
    this.supplierConfig$ = this.supplierConfig$.pipe(
      tap(config => this.loginForm.get('supplierId').setValue(config.id))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  resetLoginStatus() {
    this.loginOutput$ = null;
  }

  login(): void {
    this.resetLoginStatus();
    if (this.loginForm.valid && this.loginForm.get('supplierId').value > 0) {
      this.loginOutput$ = this.directConnectService.login$(
        this.loginForm.get('supplierId').value,
        this.loginForm.get('username').value,
        this.loginForm.get('password').value);
    }
  }
}
