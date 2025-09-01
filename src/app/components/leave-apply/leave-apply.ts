import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Leave } from '../../models/leave.model';
import { LeaveService } from '../../services/leave';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-leave-apply',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule, MatCardModule],
  templateUrl: './leave-apply.html',
  styleUrl: './leave-apply.css'
})
export class LeaveApply {
  leaveForm: FormGroup;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.leaveForm = this.fb.group({
      employeeName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const newLeave: Leave = {
        id: Date.now(),
        ...this.leaveForm.value,
        status: 'Pending'
      };
      this.leaveService.addLeave(newLeave).subscribe(() => {
        alert('Leave Applied Successfully!');
        this.leaveForm.reset();
      });
    }
  }
}
