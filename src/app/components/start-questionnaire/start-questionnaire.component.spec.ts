import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuestionnaireComponent } from './start-questionnaire.component';

describe('StartQuestionnaireComponent', () => {
  let component: StartQuestionnaireComponent;
  let fixture: ComponentFixture<StartQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartQuestionnaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
