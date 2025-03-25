import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtendimentosComponent } from './form-atendimentos.component';

describe('FormAtendimentosComponent', () => {
  let component: FormAtendimentosComponent;
  let fixture: ComponentFixture<FormAtendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAtendimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
