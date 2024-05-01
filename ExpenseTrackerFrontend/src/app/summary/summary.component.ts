import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Chart, registerables } from 'node_modules/chart.js'

@Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
   styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

   totalExpense: any
   totalIncome: any
   summary: any
   chart:any
   constructor(private service: ExpenseService) { }

   ngOnInit(): void {
      Chart.register(...registerables)
      this.service.transactionSummary().subscribe((data: any) => {
         this.totalExpense = data.total_expense
         this.totalIncome = data.total_income
         this.summary = data.category_summary
         this.displayChart(this.summary)
      })
      this.service.refreshRequired.subscribe(data => this.ngOnInit())
   }
   displayChart(summary:any) {
      if(this.chart){
         this.chart.destroy()
      }
      let ctx: any = document.getElementById('myChart');

      this.chart=new Chart(ctx, {
         type: 'doughnut',
         data: {
            labels: summary.map((item:any)=>item.category),
            datasets: [{
               label: '# of Votes',
               data: summary.map((item:any)=>item.total),
               borderWidth: 1
            }]
         },
         options: {
            scales: {
               y: {
                  beginAtZero: true
               }
            }
         }
      });
   }



}
