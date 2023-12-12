import { AbstractControl } from "@angular/forms";

export class PasswordValidators {

    static passwordShouldMatch(passStr: string, confirmPass: string) {
        const validators = (form: AbstractControl) => {
            let password = form.get(passStr);
            let confirmPassword = form.get(confirmPass);
            if (!password || !confirmPassword) return
            if (password.value !== confirmPassword.value)
                return confirmPassword.setErrors({ passwordShouldMatch: true })
            else {
                const errors = confirmPassword.errors
                if (!errors) return

                delete errors['passwordShouldMatch']
            }
        }
        return validators
    }
}