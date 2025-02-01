import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import CreateInvoiceComponent from "./create-invoice.component";

describe('CreateInvoiceComponent', () => {

  let fixture: ComponentFixture<CreateInvoiceComponent>;
  let compiled: HTMLElement;
  let component: CreateInvoiceComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInvoiceComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInvoiceComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
