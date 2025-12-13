import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { NavigatorService } from "../services/navigate.service";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "../components/sign-in-dialog/sign-in-dialog";

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const auth = inject(AuthService)
    const navigator = inject(NavigatorService)
    const dialog = inject(MatDialog)

    if (auth.isAuthenticated()) {
        return true
    }

    navigator.save(state.url)
    dialog.open(SignInDialog, {
        disableClose: true
    })

    return false
}