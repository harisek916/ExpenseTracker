import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isActive=false

  constructor(private service:ExpenseService,private route:Router){}
  
  toggleButton(){
    this.isActive=!this.isActive
  }
  signUpForm=new FormGroup({
    username:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  })

  signInForm=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  })
  register(){
    let data=this.signUpForm.value
    this.service.signUp(data).subscribe(data=>{
      console.log(data)
      this.signUpForm.reset()
      this.toggleButton()
    })
  }
  login(){
    let data=this.signInForm.value
    this.service.signIn(data).subscribe((data:any)=>{
      console.log(data)
      let accessKey=data.token
      let token=`Token ${accessKey}`
      localStorage.setItem("token",token)
      this.route.navigateByUrl("home")
    })
  }
}
