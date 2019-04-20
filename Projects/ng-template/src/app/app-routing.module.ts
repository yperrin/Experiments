import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentChildComponent } from './parent-child/parent-child.component';
import { ReferencesComponent } from './references/references.component';

const routes: Routes = [
  { path: 'parent-child', component: ParentChildComponent },
  { path: 'references', component: ReferencesComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
