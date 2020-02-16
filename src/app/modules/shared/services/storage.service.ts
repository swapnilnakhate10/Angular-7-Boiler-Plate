import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

    // declare constants here
    public static USER_ID: string = 'user_id';
    public static USER_FIRSTNAME: string = 'user_firstname';
    public static USER_LASTNAME: string = 'user_lastname';
    public static USER_TYPE: string = 'user_type';
    public static USER_EMAIL: string = 'user_email';
    public static USER_DESIGNATION: string = 'user_designation';
    public static USER_CURRENT_TEAM_ID: string = 'user_current_team_id';
    public static USER_IMAGE: string = 'user_image';
    public static CURRENT_TEAM_MEMBERS_GITID: string = 'current_team_members_gitid';
    public static ORGANIZER_ID: string = 'organizer_id';
    public static ORGANIZER_NAME: string = 'organizer_name';
    public static CURRENT_ORGANIZATION_NAME: string = 'current_organization';
    public static ORGANIZER_EMAIL: string = 'organizer_email';
    public static ORGANIZER_CONTACT: string = 'organizer_contact';
    public static ORGANIZER_IMAGE: string = 'organizer_image';

    public static JUDGE_ID: string = 'judge_id';

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
