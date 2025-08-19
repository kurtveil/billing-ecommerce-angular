import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';
import { ProductService } from '../../core/services/products/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { CustomDialogComponent } from '../../shared/custom-dialog/custom-dialog.component';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';

export class Product {
  id: string = '';
  name: string = '';
  description: string= '';
  price: string= '';
  amount: string= '';
  characteristics: string= '';
}


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [SnackbarComponent]
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['select','name', 'description', 'price', 'characteristics', 'amount', 'actions'];
  dataSource = [];
  dialog = inject(MatDialog);
  snackBarCustom = inject(SnackbarComponent);
  selectedProducts = new Set<string>();
  constructor(public productService: ProductService) { } 

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().valueChanges.subscribe({
      next: (response: any) => {
        this.dataSource = response.data.products;
        console.log(this.dataSource);
      },
      error: (error: any) => { 
        console.error(error);
      }      
    });
  }


  addProduct(){
    this.openDialogProduct({title:'Agregar Producto'});
  }

  openDialogProduct(data: any){
    const dialogRef = this.dialog.open(AddProductComponent,{
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  editProduct(product: Product){
    this.openDialogProduct({product: product, title: 'Editar producto'});
  }

  deleteProduct(product: Product){
    this.openDialog('100ms', '500ms', product);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    console.log(data);
    
    this.dialog.open(CustomDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data
    }).afterClosed().subscribe(result=> {
      if (result) {
        this.productService.deleteProduct(data.id).subscribe({
          next: (result)=> {
            console.log(result);
            this.snackBarCustom.openSnackBar('Producto Eliminado', 'Cerrar', 'center', 'top', 'success-snackbar');
          },
          error: ()=> {
            this.snackBarCustom.openSnackBar('Error', 'Cerrar', 'center', 'top', 'error-snackbar');
          }
        })
      }
    });
  }

  toggleSelection(id: string, checked: boolean): void {
  if (this.selectedProducts.has(id)) {
    this.selectedProducts.delete(id);
  } else {
    this.selectedProducts.add(id);
  }
}

toggleAllSelection(checked: boolean): void {
  if (checked) {
    this.dataSource.forEach((product: Product) => {
      this.selectedProducts.add(product.id);
    });
  } else {
    this.selectedProducts.clear();
  }
}

}
