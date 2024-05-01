import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-transactiondetail',
  templateUrl: './transactiondetail.component.html',
  styleUrls: ['./transactiondetail.component.css']
})
export class TransactiondetailComponent implements OnInit {
  id:any
  transaction:any

  constructor(private route:ActivatedRoute,private service:ExpenseService){
    this.id=this.route.snapshot.params["id"]
  }
  
  ngOnInit(): void {
    this.service.retrieveTransactionDetail(this.id).subscribe(data=>this.transaction=data)
    
  }

}
