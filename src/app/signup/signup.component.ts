import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { PasswordValidators } from './password.validators';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {passwordToggler: boolean = true;

  signupForm!: FormGroup;

  isSubmitted = false;

 

 

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {

 

  }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({

      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],

      email: ['', [Validators.required,

      Validators.minLength(10),

      Validators.maxLength(30),Validators.email]],

      mobileNumber: ['',

        [

          Validators.required,

          Validators.maxLength(10),

          Validators.minLength(10),

          Validators.pattern(/^[0-9]*$/)

        ]

      ],

      password: [

        '',

        [

          Validators.required,

          Validators.minLength(8),

          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@#$!%*?&]{8,}$/)

        ],

      ],

      confirmPassword: ['', Validators.required]

    }, {

      validators: PasswordValidators.passwordShouldMatch('password', 'confirmPassword')

 

    })

  }

  get fc() {

    return this.signupForm.controls;

  }

  submit() {

    this.isSubmitted = true;

    if (this.signupForm.invalid) return;

 

    const user = this.signupForm.value;

    const dataToPass = {

      name: user.name,

      email: user.email,

      phoneNumber: user.mobileNumber,

      password: user.password

    }

 

    console.log(dataToPass)

    this.userService.registerUser(dataToPass).subscribe({

      next: () => {

        this.router.navigate(['/login']);

        this.showSuccessAlert();

      },

      error: (err: any) => {

        console.log(err.error);

        this.showErrorAlert(err.error.message);

   

       

      }

    });

 

  }

  limitUserNameLength(event: Event): void {

    const input = event.target as HTMLInputElement;

    const inputValue = input.value;

    if (inputValue.length > 10) {

      input.value = inputValue.slice(0, 15);

    }

  }

  limitEmailLength(event: Event): void {

    const input = event.target as HTMLInputElement;

    const inputValue = input.value;

    if (inputValue.length > 10) {

      input.value = inputValue.slice(0, 30);

    }

  }

 

  limitMNumberLength(event: Event): void {

    const input = event.target as HTMLInputElement;

    const inputValue = input.value;

    const isNumeric = !isNaN(Number(inputValue));

    if (!isNumeric) {

      input.value = inputValue.slice(0, -1);

    }

    if (inputValue.length > 10) {

      input.value = inputValue.slice(0, 10);

    }

  }

 

 

  checkInput(event: KeyboardEvent) {

    const key = event.keyCode

    return (

      (key >= 65 && key <=90) ||

      (key >= 97 && key <= 122) ||

      key === 8

    )

  }

 

  togglePassword() {

    this.passwordToggler = !this.passwordToggler

  }

  private showSuccessAlert() {

    Swal.fire({

      icon: 'success',

      title: 'Signup Successful!',

      text: 'You have successfully signed up.',

      confirmButtonColor: '#28a745',

      confirmButtonText: 'OK'

    });

  }

 

  private showErrorAlert(errorMessage: string) {

    Swal.fire({

      icon: 'error',

      title: 'Error!',

      text: errorMessage,

      confirmButtonColor: '#d33',

      confirmButtonText: 'OK'

    });

  }
}
  