import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-transactioncreate',
  templateUrl: './transactioncreate.component.html',
  styleUrls: ['./transactioncreate.component.css']
})
export class TransactioncreateComponent implements OnInit {
  categories=['food','fuel','entertainment','bills','rent',"emi",'miscellaneous']
  isEdit:boolean=false
  instanceId:any
  title:string="Add Transaction"
  
  constructor(private service:ExpenseService){}

  transactionForm=new FormGroup({
    "title":new FormControl("",Validators.required),
    "type":new FormControl("",Validators.required),
    "category":new FormControl("",Validators.required),
    "amount":new FormControl("",Validators.required),
  })
  addTransaction(){
    let data=this.transactionForm.value
    if(this.isEdit){
      this.service.updateTransaction(this.instanceId,data).subscribe(data=>{
        console.log(data)
        this.transactionForm.reset()
        this.isEdit=false
        this.title="Add Transaction"
      })
    }
    else{
      this.service.addTransaction(data).subscribe(data=>{
        console.log(data)
        this.transactionForm.reset()
      })
    }
  }
  ngOnInit(): void {
    this.service.emitTransactionId.subscribe((id:any)=>{
      this.isEdit=true
      this.title="Edit Transaction"
      this.instanceId=id
      this.service.retrieveTransactionDetail(id).subscribe(data=>this.transactionForm.patchValue(data))
    })
  }
}
