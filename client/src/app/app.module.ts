//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//components
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GraphQLModule } from './graphql.module';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './data/data.service';
import { SessionService } from './session/session.service';

@NgModule({
  declarations: [AppComponent, MainComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    GraphQLModule,
  ],
  providers: [DataService, SessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
