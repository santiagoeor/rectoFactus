import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched;
    }

    public getFieldError(form: FormGroup, field: string) {

        if (!form.controls[field]) return null;

        const errors = form.controls[field].errors || {};

        for (const key of Object.keys(errors)) {
            // console.log(key);
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Este campo requiere mínimo ${errors['minlength'].requiredLength} letras`;
                case 'maxlength':
                    return `Este campo no puede tener más de ${errors['maxlength'].requiredLength} letras`;
                case 'pattern':
                    return 'Campo no es de tipo email';
            }
        }

        return null;
    }

}