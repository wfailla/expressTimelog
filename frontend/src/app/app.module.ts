import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogDisplayComponent } from './component/log-display/log-display.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { LogInputComponent } from './component/log-input/log-input.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { WorkDoneDisplayComponent } from './component/work-done-display/work-done-display.component';
import { SlackingTimeDisplayComponent } from './component/slacking-time-display/slacking-time-display.component';
import { TimereportComponent } from './component/timereport/timereport.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { DatePickerComponent } from './component/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    LogDisplayComponent,
    LogInputComponent,
    WorkDoneDisplayComponent,
    SlackingTimeDisplayComponent,
    TimereportComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
