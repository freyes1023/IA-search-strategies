import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaEstrellaComponent } from './busqueda-estrella.component';

describe('BusquedaEstrellaComponent', () => {
  let component: BusquedaEstrellaComponent;
  let fixture: ComponentFixture<BusquedaEstrellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaEstrellaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
