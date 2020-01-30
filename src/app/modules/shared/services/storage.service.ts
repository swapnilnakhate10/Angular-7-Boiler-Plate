import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

    // declare constants here
    public static USER_ID: string = 'user_id';
    public static USER_NAME: string = 'user_name';

    public static set(key: string, value: any): void {
        if(key !== null && value !== null && key !== undefined && value !== undefined ) {
          localStorage.setItem(key, value);
        }
    }

    public static get(key: string): any {
        if(key !== null && key !== undefined) {
          return localStorage.getItem(key);
        } else {
          return '';
        }
    }

    public static remove(key: string): void {
      if(key !== null && key !== undefined) {
        localStorage.removeItem(key);
      }
    }

    public static removeAll(): void {
        localStorage.clear();
    }
}
