import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAmplitudComponent } from './busqueda-amplitud.component';

describe('BusquedaAmplitudComponent', () => {
  let component: BusquedaAmplitudComponent;
  let fixture: ComponentFixture<BusquedaAmplitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaAmplitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaAmplitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
