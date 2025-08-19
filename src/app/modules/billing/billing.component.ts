import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';
import { CommonModule } from '@angular/common';
import { ScannerModalComponent } from './scanner-modal/scanner-modal.component';
import { MatDialog } from '@angular/material/dialog';
interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit{
 
  // isScanner = false;
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
 readonly dialog = inject(MatDialog);
  constructor() {}
  ngOnInit(): void {
  }

  onScanner() {
    // this.isScanner = true;
   }

    openScannerModal(){
       const dialogRef = this.dialog.open(ScannerModalComponent,{
         data: {
          title: 'Codigo de barras'
         }
       });
   
       dialogRef.afterClosed().subscribe(result => {
        //  this.getProducts();
        console.log(result);
        
       });
     }


 
   /** Gets the total cost of all transactions. */
   getTotalCost() {
     return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
   }
}
