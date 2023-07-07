import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { saveAs } from 'file-saver';
import { ApiService } from '../services/api.service';

import { validateEmail } from './table-validators.service';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.css']
})
export class SupervisorDashboardComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private _api: ApiService) { }

  ngOnInit() {
    this.jobForm = this.fb.group({
      jobs: this.fb.array([])
    });
    this.getJobs();
  }

  getJobs() {
    const control = <FormArray>this.jobForm.get('jobs');
    this._api.getTypeRequest('manageJobs/get').subscribe((res: any) => {
      console.log(res, 'resp');

      for (const job of res.data.jobs) {
        const grp = this.fb.group({
          deviceId: [job.deviceId],
          jobName: [job.jobName, Validators.required],
          expectedOp: [job.expectedOp],
          actualOp: [job.actualOp],
          startTime: [],
          endTime: [],
          operatorName: [job.operatorName],
        });
        control.push(grp);
      }
    });
  }

  initiatForm(): FormGroup {
    return this.fb.group({
      deviceId: [''],
      jobName: ['', Validators.required],
      expectedOp: [0],
      actualOp: [0],
      startTime: [],
      endTime: [],
      operatorName: [],
    });
  }

  get getFormData(): FormArray {
    return <FormArray>this.jobForm.get('jobs');
  }

  addUser() {
    const control = <FormArray>this.jobForm.get('jobs');
    control.push(this.initiatForm());
  }

  remove(index: number) {
    const control = <FormArray>this.jobForm.get('jobs');
    control.removeAt(index);
  }

  save() {
    console.log('isValid', this.jobForm.valid);
    console.log('value', this.jobForm.value);
  }


  // form: FormGroup;
  // private formSubmitAttempt: boolean;
  // private uid = 0;
  // private savedJobDetails;

  // @ViewChild('table') table: MatTable<any>;

  // displayedColumns = ['deviceId', 'jobName', 'expectedOp', 'actualOp', 'startTime', 'endTime', 'operatorName'];
  // dataSource: MatTableDataSource<AbstractControl>;

  // get productControlArray() {
  //   return this.form.get('jobs') as FormArray;
  // }

  // constructor(private fb: FormBuilder, private _api: ApiService) {
  //   this.createForm();
  //   this.addRow();
  //   this.dataSource = new MatTableDataSource(
  //     this.productControlArray.controls);
  // }

  // ngOnInit() {
  //   this._api.getTypeRequest('manageJobs/get').subscribe((res: any) => {
  //     console.log(res, 'resp');
  //     this.savedJobDetails = res.data;
  //     this.addRow()
  //   });
  // }

  // createForm() {
  //   this.form = this.fb.group({
  //     jobs: this.fb.array([]),
  //   });
  // }

  // trackRows(index: number, row: AbstractControl) {
  //   return row.value.uid;
  // }

  // private addRow() {
  //   const rows = this.productControlArray;
  //   if (this.savedJobDetails?.jobs?.length > 0) {
  //     // for (let i = 0; i < this.savedJobDetails.jobs.length; i++) {
  //     //   const element = this.savedJobDetails.jobs[i];

  //     //       this.productControlArray.value[i].deviceId = i,
  //     //       this.productControlArray.value[i].jobName = element.jobName,
  //     //       this.productControlArray.value[i].expectedOp = element.expectedOp,
  //     //       this.productControlArray.value[i].actualOp = element.actualOp,
  //     //       // this.productControlArray.value[i].startTime = [],
  //     //       // this.productControlArray.value[i].endTime = [],
  //     //       this.productControlArray.value[i].operatorName = element.operatorName

  //     // }
  //     this.dataSource.data = this.savedJobDetails.jobs
  //     this.table.renderRows();
  //   } else {
  //     for (let i = 0; i < 3; i++) {
  //       rows.push(
  //         this.fb.group({
  //           deviceId: i,
  //           // product_id: [undefined, Validators.required],
  //           jobName: [``, Validators.required],
  //           expectedOp: [0, Validators.required],
  //           actualOp: [0, Validators.required],
  //           startTime: [],
  //           endTime: [],
  //           operatorName: ['']
  //         })
  //       );
  //     }
  //   }
  // }

  // createRow() {
  //   this.addRow();
  //   this.table.renderRows();
  // }

  // private nextUid() {
  //   ++this.uid
  //   return this.uid;
  // }

  // resetForm() {
  //   this.form.reset()
  // }

  // saveForm() {
  //   console.log(this.form.value.jobs, 'heyy');
  //   this._api.postTypeRequest('manageJobs/save', this.form.value).subscribe((res: any) => {
  //     if (res.status) {
  //       console.log(res)
  //     } else {
  //       console.log(res)
  //       alert(res.msg)
  //     }
  //   });

  //   // this.downloadFile(this.form.value.jobs)
  // }

  // // downloadFile(data: any) {
  // //   const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
  // //   const header = Object.keys(data[0]);
  // //   let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  // //   csv.unshift(header.join(','));
  // //   let csvArray = csv.join('\r\n');

  // //   var blob = new Blob([csvArray], { type: 'text/csv' })
  // //   saveAs(blob, "myFile.csv");
  // // }


}
