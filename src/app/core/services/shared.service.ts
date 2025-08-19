import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userObject = new BehaviorSubject<User | null>(null);
  user$ = this.userObject.asObservable();
  constructor() {
    // this.loadUserFromStorage();
   }

  setPayload(user: User): void {
    this.userObject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // loadUserFromStorage() {
  //   const userJson = sessionStorage.getItem('user');
  //   if (userJson) {
  //     this.userObject.next(JSON.parse(userJson));
  //   }
  // }

 logout() {
    this.userObject.next(null);
    sessionStorage.removeItem('user');
  }


}
