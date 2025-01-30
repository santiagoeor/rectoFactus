import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { enviroment } from "../../../../env/enviroment";
import { PrimeNgModule } from "../../../shared/prime-ng.module";
import { ValidatorsService } from "../../../shared/services/validators.service";
import { isTokenExpired } from "../../guards/tokenExpiration.guard";
import { Auth } from "../../interfaces/auth.interface";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, PrimeNgModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit, OnDestroy {

    private authtService = inject(AuthService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private valitarorsService = inject(ValidatorsService);

    private loginSubscription!: Subscription;

    public errorMessageBolean = signal<boolean>(false);
    public errorMessage = signal<string>('');
    public loading = signal<boolean>(false);

    ngOnInit(): void {
        const token = this.authtService.getToken;
        if (token) {
            const result = isTokenExpired(token.access_token);
            if (!result) {
                this.redirectDashBoard();
            }
        }
    }

    public myForm: FormGroup = this.fb.group({
        user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.valitarorsService.emailPattern)]],
        password: ['', [Validators.required, Validators.maxLength(100),]],
    });

    isValidField(field: string) {
        return this.valitarorsService.isValidField(this.myForm, field);
    }

    getFieldError(field: string) {
        return this.valitarorsService.getFieldError(this.myForm, field);

    }

    redirectDashBoard(): void {
        this.authtService.isAuthenticated = true;
        this.router.navigate(['./invoicesList']);
    }

    login(): void {
        this.errorMessageBolean.set(false);
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();
        } else {
            const credents: Auth = {
                grant_type: enviroment.grant_type,
                client_id: enviroment.client_id,
                client_secret: enviroment.client_secret,
                username: this.myForm.value.user,
                password: this.myForm.value.password
            }
            this.loading.set(true);
            this.loginSubscription = this.authtService.login(credents).subscribe({
                next: (resp) => {
                    this.loading.set(false);
                    localStorage.setItem('tokenSysFactus', JSON.stringify(resp));
                    this.redirectDashBoard();
                },
                error: (err) => {
                    this.loading.set(false);
                    this.errorMessageBolean.set(true);
                    this.errorMessage.set(err);
                }
            })
        }
    }

    ngOnDestroy(): void {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }

}