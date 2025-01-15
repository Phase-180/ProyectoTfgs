import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestraCasaComponent } from './nuestra-casa.component';

describe('NuestraCasaComponent', () => {
  let component: NuestraCasaComponent;
  let fixture: ComponentFixture<NuestraCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestraCasaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestraCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
