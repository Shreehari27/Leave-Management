import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Leave } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  [x: string]: any;
  private leaves: Leave[] = [
    {
      id: 1,
      employeeName: 'Alice',
      fromDate: '2025-09-01',
      toDate: '2025-09-03',
      reason: 'Family event',
      status: 'Pending'
    },
    {
      id: 2,
      employeeName: 'Bob',
      fromDate: '2025-09-10',
      toDate: '2025-09-12',
      reason: 'Medical',
      status: 'Approved'
    }
  ];

  private leavesSubject = new BehaviorSubject<Leave[]>([...this.leaves]);

  getLeaves(): Observable<Leave[]> {
    return this.leavesSubject.asObservable();
  }

  getLeaveById(id: number): Observable<Leave | undefined> {
    return of(this.leaves.find(l => l.id === id));
  }

  applyLeave(payload: Omit<Leave, 'id' | 'status'>): Observable<Leave> {
    const newLeave: Leave = {
      id: Date.now(),
      status: 'Pending',
      ...payload
    };
    this.leaves.push(newLeave);
    this.leavesSubject.next([...this.leaves]);
    return of(newLeave);
  }

  updateLeave(id: number, update: Partial<Leave>): Observable<Leave | undefined> {
    const idx = this.leaves.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.leaves[idx] = { ...this.leaves[idx], ...update, id };
      this.leavesSubject.next([...this.leaves]);
      return of(this.leaves[idx]);
    }
    return of(undefined);
  }

  deleteLeave(id: number): Observable<void> {
    this.leaves = this.leaves.filter(l => l.id !== id);
    this.leavesSubject.next([...this.leaves]);
    return of(undefined);
  }
}
