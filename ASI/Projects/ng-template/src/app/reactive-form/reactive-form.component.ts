import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, MaxLengthValidator, ValidationErrors, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http/http';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit, OnDestroy {
  maxLength = 280;
  formStatus = '';
  formChangeSubscription: Subscription;
  myForm = this.fb.group({
    first: ['default', [Validators.required]],
    second: ['', [Validators.required]],
    third: ['match second', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    text: ['', [Validators.required, Validators.maxLength(this.maxLength)]]
  },
    {
      validators: [this.valuesMatch]
    });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formStatus = this.getFormStatus();
    this.formChangeSubscription = this.myForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        console.log(value);
        this.formStatus = this.getFormStatus();
      });
  }
  ngOnDestroy(): void {
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe();
    }
  }

  private getFormStatus(): string {
    const value = 'Status: ' + this.myForm.status + '; Touched: ' + this.myForm.touched +
      '; Pristine: ' + this.myForm.pristine + '; Valid: ' + this.myForm.valid;
    return value;
  }

  valuesMatch(formGroup: FormGroup): ValidationErrors | undefined {
    const firstValue = formGroup.get('second');
    const secondValue = formGroup.get('third');
    if (firstValue.value === secondValue.value) {
      return null;
    } else {
      return { valuesMatch: true };
    }
  }

  // asyncMatch(http: HttpClient) {
  //   return (control: FormControl): Observable<ValidationErrors | null> => {
  //     return http.get('').pipe{
  //       map(value => value ? { errorMessage: 'error' } : null}),
  //     catchError(error => { errorMessage: 'error' } )
  //   }
  // }
}
