import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.models';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  
  userForm !: FormGroup;

  constructor(private fromBuilder: FormBuilder,
              private userService: UserService,
              private router: Router){}

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.userForm = this.fromBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference: ['', Validators.required],
      hobbies: this.fromBuilder.array([])
    });
  }


  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['fisrtName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies']? formValue['hobbies'] : []

    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  getHobbies(){
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby(){
    const newHobbyControl = this.fromBuilder.control('', Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

}
