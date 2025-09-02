import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave';
import { Leave } from '../../models/leave.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Highlight } from '../../directives/highlight';
import { StatusPipe } from '../../pipes/status-pipe';
import { Observable } from 'rxjs/internal/Observable';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog';


@Component({
  selector: 'app-leave-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, RouterModule, Highlight, StatusPipe, ConfirmationDialogComponent],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css'
})
export class LeaveList implements OnInit {
  leaves: Leave[] = [];

  constructor(private leaveService: LeaveService, private matDialog: MatDialog) { }

  ngOnInit(): void {
   
    this.leaveService.getLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  deleteLeave(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure to delete this leave request?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leaveService.deleteLeave(id).subscribe(() => {
          this.leaveService.getLeaves().subscribe(data => {
            this.leaves = data;
          });
        });
      }
    });
  }

}
