import { NgModule } from '@angular/core';
import { DirectEnvironmentComponent } from './direct-environment/direct-environment.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [
      DirectEnvironmentComponent,
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
        DirectEnvironmentComponent,
      ],
    })
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [ HttpErrorInterceptor ]
        };
      }
}
