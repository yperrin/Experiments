import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentChildComponent } from './parent-child/parent-child.component';
import { ReferencesComponent } from './references/references.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ObservableComponent } from './observable/observable.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { CrudTemplateComponent } from './crud-template/crud-template.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: 'parent-child', component: ParentChildComponent },
  { path: 'references', component: ReferencesComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
  { path: 'observables', component: ObservableComponent },
  { path: 'javascript', component: JavascriptComponent },
  { path: 'crud', component: CrudTemplateComponent },
  { path: 'play', component: PlayComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
