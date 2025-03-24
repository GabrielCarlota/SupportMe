import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgendamentosComponent } from './form-agendamentos.component';

describe('FormAgendamentosComponent', () => {
  let component: FormAgendamentosComponent;
  let fixture: ComponentFixture<FormAgendamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAgendamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
