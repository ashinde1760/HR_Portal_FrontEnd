import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Bills } from 'src/app/model/Bills';
import { BillsService } from 'src/app/services/bills.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
interface NatureType {
  type: string;
}
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [MessageService],
})
export class BillingComponent implements OnInit {
  empId = '';
  selectedFiles?: FileList;
  errorMsg = '';
  billsDialogue?: boolean;
  billsData!: Bills[];
  types: NatureType[];
  selectedNature: any;
public bill ={

  amount:0,

  fileUri:'',
  filename:'',
  reason:'',
  nature:'',
  approveOption:''
  
  
}
  currentFile?: File;
  constructor( private billService: BillsService,     private messageService: MessageService,) {

    this.types = [
      { type: 'Buisiness Travel' },
      { type: 'Education or training' },
     { type: 'Healthcare' },
     { type: 'Other' }
    ];
   }

  ngOnInit(): void {
    
    this.empId = sessionStorage.getItem('empId');

      //fetching data from bill for bills details table
      this.billService.getBills().subscribe((data: any) => {
        this.billsData = data;
        console.log(this.billsData);
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  submitBill(): void {
   
    
    this.errorMsg = '';
    
    const amount: Bills | null = this.bill;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file && amount) {
        this.currentFile = file;
        console.log("Uploading bill....");

        this.bill.nature = this.selectedNature['type'];
        this.billService.upload(this.currentFile, amount, this.empId).subscribe(
          (event: any) => {
            this.ngOnInit();
            Swal.fire({
              position:'top',
             icon: 'success',
             title: 'Submitted Succesfully!!',
             showConfirmButton: false,
             timer: 1500
           })
          },
          (err: any) => {
            console.log(err);
            // if (err.error && err.error.responseMessage) {
            //   this.errorMsg = err.error.responseMessage;
            // } else {
            //   this.errorMsg = 'Error occurred while uploading a file!';
            // }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }

  downloadFile(filename: string): void {
    this.billService.download(filename).subscribe((event) => {
      saveAs(event, filename);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }

  showBills(){
    this.billsDialogue = true;
  }

    //for searching
    getEventValue($event: any): string {
      return $event.target.value;
    }

}
