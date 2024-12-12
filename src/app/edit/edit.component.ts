import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  empform: FormGroup;

  education: string[] = ['martic', 'diploma', 'intermediate', 'greduate', 'post greduate']

  constructor(private fb: FormBuilder, private service: ServiceService, private dialogref: DialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.empform = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      exp: '',
      package: '',

    })
  }
  ngOnInit(): void {
    this.empform.patchValue(this.data)
  }
  onformsubmit() {
    if (this.empform.valid) {
      if (this.data) {
        this.service.updateEmp(this.data.id, this.empform.value).subscribe({
          next: (val: any) => {
            alert("Employee details successful")
            this.dialogref.close()
          },
          error: (err: any) => {
            alert(err);
          }
        })

      } else {
        this.service.addEmploye(this.empform.value).subscribe({
          next: (val: any) => {
            alert("employee added successful")
            this.dialogref.close()
          },
          error: (err: any) => {
            alert(err);
          }
        })

      }

    }
  }

}
