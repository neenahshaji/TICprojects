import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards';
import { ApiService, StateService } from './services';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from "primeng/panel";
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { HomeComponent, LoginComponent } from './features';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwtInterceptor } from './Interceptors/jwt.interceptor';
import { FooterComponent } from './features/footer/footer.component';
import { DividerModule } from "primeng/divider";
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { CartService } from './services/cart.service';
import { CartComponent } from './features/cart/cart.component';
import { MenuModule } from 'primeng/menu';
import { MenuItem, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { MyprofileComponent } from './features/myprofile/myprofile.component';
import { MyordersComponent } from './features/myorders/myorders.component';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SplitterModule } from "primeng/splitter";
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RadioButtonModule} from 'primeng/radiobutton';
import {BadgeModule} from 'primeng/badge';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { VieworderComponent } from './features/vieworder/vieworder.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    MyprofileComponent,
    MyordersComponent,
    VieworderComponent,
   
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    CardModule,
    // Ng2SearchPipeModule,
    PanelModule,
    DataViewModule,
    OrderListModule,
    SlideMenuModule,
    AccordionModule,
    InputNumberModule,
    DropdownModule,
    MenuModule,
    SidebarModule,
    CheckboxModule,
    // MenuItem,
    TableModule,
    CalendarModule,
    SplitterModule,
    DividerModule,
    DialogModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    RadioButtonModule,
    BadgeModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    VirtualScrollerModule,
    InfiniteScrollModule
  ],
  providers: [
    ApiService,
    StateService,
    CartService,
    AuthGuard,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
