import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaAmplitudComponent } from './components/busqueda-amplitud/busqueda-amplitud.component';
import { BusquedaEstrellaComponent } from './components/busqueda-estrella/busqueda-estrella.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ExpertSystemComponent } from './pages/expertSystem/expert-system/expert-system.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaAmplitudComponent,
    BusquedaEstrellaComponent,
    ExpertSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
