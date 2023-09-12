import { Component } from '@angular/core';
import { user } from './user';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  usersarray: user[]=[];
  addUser:FormGroup;
  deleteUser:FormGroup;

  


  constructor(private userService : UserService ,private fb: FormBuilder){
    this.addUser= this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailAddress: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@cognizant\.com$/)]],
      role: ['HR', Validators.required],
      currentGradeId: [1, Validators.required]
    });

    this.deleteUser = this.fb.group({
      employeeId:''
    })
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(response=>{
      console.log(response);
      this.usersarray=response;
    })
  }

  onSubmit(){
    this.userService.getUser().subscribe(res=>{
      console.log(res);
      this.usersarray=res;
    })
  }

  onPost(){
    if(this.addUser.valid){
      this.userService.createUser(this.addUser.value).subscribe(response => {
        console.log('User created successfully:', response);
      }, error => {
        console.error('Error creating user:', error);
      });
    }
    
  }

  onDelete(){
    this.userService.deleteUser(this.deleteUser.value['employeeId']).subscribe(res=>{
      console.log(res)
    })
  }
}
