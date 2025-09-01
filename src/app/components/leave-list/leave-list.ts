import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave';
import { Leave } from '../../models/leave.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Highlight } from '../../directives/highlight';
import { StatusPipe } from '../../pipes/status-pipe';
import { Observable } from 'rxjs/internal/Observable';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-leave-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, Highlight, StatusPipe],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css'
})
export class LeaveList implements OnInit {
  leaves: Leave[] = [];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
   
    this.leaveService.getLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  deleteLeave(id: number): void {
    this.leaveService.deleteLeave(id).subscribe();
  }

}
