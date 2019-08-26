import { NgModule } from '@angular/core';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { EnvironmentService } from './environment.service';
import { FormControlDirective } from './form-control.directive';

@NgModule({
  declarations: [
    FormControlDirective
  ],
  imports: [
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  exports: [
    FormControlDirective
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [HttpErrorInterceptor, EnvironmentService]
    };
  }
}
