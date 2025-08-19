import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';

@Component({
  selector: 'app-code-scanner',
  standalone: true,
  imports: [],
  templateUrl: './code-scanner.component.html',
  styleUrl: './code-scanner.component.scss'
})
export class CodeScannerComponent implements OnInit, AfterViewInit {
  @ViewChild('video') video!: ElementRef;
  @Output() code = new EventEmitter<string>();
  private codeReader: BrowserMultiFormatReader;
  public scannedResult: string = '';

  constructor() {
    this.codeReader = new BrowserMultiFormatReader();
  }
  ngAfterViewInit(): void {
    this.startScanner();
  }

  ngOnInit(): void {}

  startScanner(): void {
    this.codeReader.decodeFromVideoDevice(undefined, this.video.nativeElement, (result: any, error, controls) => {
      if (result) {
        this.scannedResult = result.getText();
        this.code.emit(this.scannedResult)
        controls.stop();
      }
    }).catch(err => console.error(err));
    
  }
}
