import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../core/modules/material.module';
import { CodeScannerComponent } from '../../../shared/code-scanner/code-scanner.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scanner-modal',
  standalone: true,
  imports: [MaterialModule, CodeScannerComponent, ReactiveFormsModule],
  templateUrl: './scanner-modal.component.html',
  styleUrl: './scanner-modal.component.scss'
})
export class ScannerModalComponent {
  data = inject(MAT_DIALOG_DATA);
  form = new FormGroup({
    barcode: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });
  isForm = true;

  constructor() {
    this.form.get('barcode')?.setValue('7702146904008');
  }
  codeScanned(code: string){
    console.log(code);
    this.isForm = true;
  }
  addTransaction(){

  }
  close(){

  }
}
