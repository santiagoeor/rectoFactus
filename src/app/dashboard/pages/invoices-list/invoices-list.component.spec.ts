import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import InvoicesListComponent from './invoices-list.component';

describe('InvoicesListComponent', () => {
  let fixture: ComponentFixture<InvoicesListComponent>;
  let compiled: HTMLElement;
  let component: InvoicesListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesListComponent, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvoicesListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
