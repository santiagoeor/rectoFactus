import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMenuComponent } from './best-menu.component';

describe('BestMenuComponent', () => {
  let fixture: ComponentFixture<BestMenuComponent>;
  let compiled: HTMLElement;
  let component: BestMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BestMenuComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
