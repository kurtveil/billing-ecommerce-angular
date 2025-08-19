import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../core/modules/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../products.component';
import { ProductService } from '../../../core/services/products/product.service';
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CurrencyFormatPipe } from '../../../core/pipes/currency-format.pipe';
import { CodeScannerComponent } from '../../../shared/code-scanner/code-scanner.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, CodeScannerComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [
    ProductService, 
    SnackbarComponent, 
    CurrencyPipe, 
    CurrencyFormatPipe,
  ],
})
export class AddProductComponent {
  productForm!: FormGroup;
  product = new Product();
  error: string = '';
  snackBarCustom = inject(SnackbarComponent);
  data = inject(MAT_DIALOG_DATA);
  isScanner: boolean = false;
  
  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
    private currencyFormatPipe: CurrencyFormatPipe
  ) { }


  ngOnInit(): void {
    this.initForm();
    if (this.data.product) {
      this.productForm.patchValue(this.data.product);
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      amount: ['', Validators.required],
      characteristics: ['', Validators.required],
      code: ['' ]
    });
  }

  submit(){
    if (this.data.product) {
      this.editProduct();
    } else {
      this.addProduct();
    }
    
  }


  editProduct(){
    this.productService.editProduct({id: this.data.product.id ,...this.productForm.value}).subscribe({
      next: (response: any) => {  
        console.log(response);
        this.snackBarCustom.openSnackBar('Bienvenido', 'Cerrar', 'center' , 'top', 'success-snackbar');
      },
      error: (error: any) => {
        console.error(error);
      } 

    });
  }

  addProduct(){
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (response: any) => {  
        console.log(response);
        this.snackBarCustom.openSnackBar('Bienvenido', 'Cerrar', 'center' , 'top', 'success-snackbar');
      },
      error: (error: any) => {
        console.error(error);
      } 

    });
  }

  /**
   * 
   * @param event Sirve para dar formato de moneda local
   */
  updatePrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      const formattedValue = this.currencyFormatPipe.transform(value);
      input.value = formattedValue ? formattedValue : '';
      this.productForm.get('price')?.setValue(value);
    }
  }

  onScanner() {
   this.isScanner = true;
  }

  codeScanned(code: string){
    this.productForm.get('code')?.setValue(code);
    this.isScanner = false;
  }

}
