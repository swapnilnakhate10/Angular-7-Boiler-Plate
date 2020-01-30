import { environment } from './../../environments/environment';

export class UrlDetails {

    public static userLoginUrl: string = environment.hackathonCore + "users/login";
    public static userRegistrationUrl: string = environment.hackathonCore + "users";

}