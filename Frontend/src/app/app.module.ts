import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatInputModule,MatSortModule,MatDialogModule, MatTableModule, MatCardModule, MatButtonModule, MatListModule, MatSelectModule, MatTabsModule, } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SwiperModule } from 'angular2-useful-swiper'
import { Pipe, PipeTransform } from '@angular/core';
import { Directive } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FileUploadModule} from 'ng2-file-upload';
import { StorageServiceModule} from 'angular-webstorage-service';
import { GstAddComponent } from './gst-add/gst-add.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';

import { BusinessService } from './business.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent, NgbdModalConfirmAutofocus } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';



@NgModule({
  declarations: [
    AppComponent,
    GstAddComponent,
    GstGetComponent,
    GstEditComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    NgbdModalConfirmAutofocus,
    ProductComponent,
    MessageboxComponent,
    ConfirmationComponent,
    //NgbModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgbModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    SwiperModule,
    MatTableModule,
    MatNativeDateModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    //PipeTransform,
    //Directive,
   
    HttpClientModule,
    StorageServiceModule
  ],
  entryComponents: [NgbdModalConfirmAutofocus,MessageboxComponent,ConfirmationComponent],
  providers: [ BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
