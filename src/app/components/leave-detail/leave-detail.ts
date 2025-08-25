import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '../../services/leave';
import { Leave } from '../../models/leave.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-leave-detail',
  imports: [CommonModule, MatCardModule],
  templateUrl: './leave-detail.html',
  styleUrls: ['./leave-detail.css']
})
export class LeaveDetail implements OnInit {
  leave?: Leave;

  constructor(private route: ActivatedRoute, private leaveService: LeaveService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.leaveService.getLeaveById(id).subscribe((l: Leave | undefined) => {
      if (l) {
        this.leave = l;
      }
    });
  }
}
