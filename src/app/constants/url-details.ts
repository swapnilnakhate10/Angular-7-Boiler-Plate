import { environment } from './../../environments/environment';

export class UrlDetails {

    public static userLoginUrl: string = environment.hackathonCore + "users/login";
    public static users: string = environment.hackathonCore + "users/";
    public static eventsListByOrganizerId: string = environment.hackathonCore + "events/organizer/";
    public static events: string = environment.hackathonCore + "events/";
    public static createEvent: string = environment.hackathonCore + "events";

    public static teams: string = environment.hackathonCore + "teams/";
    public static organizers: string = environment.hackathonCore + "organizers/";
    public static prizes: string = environment.hackathonCore + "prizes/";
    public static createOrganization: string = environment.hackathonCore + "organizers";
    public static organizationLogin: string = environment.hackathonCore + "organizers/login";
    public static updateOrganization: string = environment.hackathonCore + "organizers";

    // githubCore API
    public static createAndAddAccessToUser : string = environment.githubCore + "createrepo";
    public static test : string = environment.githubCore + "test";
    public static revokeAccess : string = environment.githubCore + "revokeaccess";
}