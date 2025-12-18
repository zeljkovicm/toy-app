import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {
    private lastUrl = 'returnUrl'
    constructor(private router: Router) { }


    clear() {
        sessionStorage.removeItem(this.lastUrl)
    }

    get(fallback = '/') {
        return sessionStorage.getItem(this.lastUrl) || fallback
    }

    save(url: string) {
        sessionStorage.setItem(this.lastUrl, url)
    }
}