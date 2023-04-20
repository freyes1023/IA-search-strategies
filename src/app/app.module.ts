import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaAmplitudComponent } from './components/busqueda-amplitud/busqueda-amplitud.component';
import { BusquedaEstrellaComponent } from './components/busqueda-estrella/busqueda-estrella.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaAmplitudComponent,
    BusquedaEstrellaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
