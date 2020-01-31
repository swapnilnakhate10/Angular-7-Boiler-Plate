import { environment } from './../../environments/environment';

export class UrlDetails {

    public static userLoginUrl: string = environment.hackathonCore + "users/login";
    public static users: string = environment.hackathonCore + "users/";
    public static eventsListByOrganizerId: string = environment.hackathonCore + "events/organizer/5e33ba4a779fee2fa862bdaf";

    public static events: string = environment.hackathonCore + "events/";
    public static teams: string = environment.hackathonCore + "teams/";
    public static organizers: string = environment.hackathonCore + "organizers/";
    public static prizes: string = environment.hackathonCore + "prizes/";
}