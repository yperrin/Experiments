import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentChildComponent } from './parent-child/parent-child.component';
import { ReferencesComponent } from './references/references.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const routes: Routes = [
  { path: 'parent-child', component: ParentChildComponent },
  { path: 'references', component: ReferencesComponent },
  { path: 'reactive-form', component: ReactiveFormComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
