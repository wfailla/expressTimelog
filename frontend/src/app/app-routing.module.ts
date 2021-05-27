import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogDisplayComponent } from './component/log-display/log-display.component';

const routes: Routes = [
  { path: '', component: LogDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
