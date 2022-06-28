export class Menu {
    title: string;
    icon: string;
    routeLink: string;
    active: boolean;
    constructor(menu: string, icon: string, routeLink: string){
        this.title = menu;
        this.icon = icon;
        this.routeLink = routeLink;
        this.active = false;
    }
}