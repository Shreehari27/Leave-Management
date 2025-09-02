import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Leave } from '../models/leave.model';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  /* private leaves: Leave[] = [
    {
      id: 1,
      employeeName: 'Ram',
      fromDate: '2025-09-01',
      toDate: '2025-09-03',
      reason: 'Family event',
      status: 'Pending'
    },
    {
      id: 2,
      employeeName: 'Ranga',
      fromDate: '2025-09-10',
      toDate: '2025-09-12',
      reason: 'Medical',
      status: 'Approved'
    },
    {
      id: 3,
      employeeName: 'Bala',
      fromDate: '2025-09-10',
      toDate: '2025-09-12',
      reason: 'Medical',
      status: 'Rejected'
    }
  ]; */
  private apiUrl = 'http://localhost:3000'; //remove this if there any issues

  private leavesSubject = new BehaviorSubject<Leave[]>([...this.leaves]);

  constructor() {}

  getLeaves(): Observable<Leave[]> {
    return this.leavesSubject.asObservable();
  }

  getLeaveById(id: number): Observable<Leave | undefined> {
    const leave = this.leaves.find(l => l.id === id);
    return of(leave);
  }

  addLeave(leave: Leave): Observable<Leave> {
    this.leaves.push(leave);
    this.leavesSubject.next([...this.leaves]); 
    return of(leave);
  }

  deleteLeave(id: number): Observable<void> {
    this.leaves = this.leaves.filter(l => l.id !== id);
    this.leavesSubject.next([...this.leaves]); 
    return of(void 0);
  }

  updateLeave(id: number, update: Partial<Leave>): Observable<Leave | undefined> {
    const idx = this.leaves.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.leaves[idx] = { ...this.leaves[idx], ...update };
      this.leavesSubject.next([...this.leaves]);
      return of(this.leaves[idx]);
    }
    return of(undefined);
  }
}
