import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMenuComponent } from './best-menu.component';

describe('BestMenuComponent', () => {
  let component: BestMenuComponent;
  let fixture: ComponentFixture<BestMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
