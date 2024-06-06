import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsShareComponent } from './recommendationsShare.component';

describe('RecommendationsComponent', () => {
  let component: RecommendationsShareComponent;
  let fixture: ComponentFixture<RecommendationsShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsShareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendationsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
