import { computed, inject } from "@angular/core"
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals'
import { AuthService } from "./services/auth.service"
import { UserModel } from "./models/user-model"
import { Toaster } from "./services/toaster.service"
import { Router } from "@angular/router"
import { SignInRequestModel, SignUpRequestModel } from "./models/auth-model"
import { NavigatorService } from "./services/navigate.service"

export type AuthState = {
    user: UserModel | null
    accessToken: string | null
    isLoading: boolean
    error: string | null
}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState<AuthState>({
        user: null,
        accessToken: null,
        isLoading: false,
        error: null
    }),

    withComputed(({ user, accessToken }) => ({
        isAuthenticated: computed(() => !!accessToken()),
        userName: computed(() => user()?.name ?? 'Guest')
    })),

    withMethods((store, authService = inject(AuthService), toaster = inject(Toaster), router = inject(Router), navigator = inject(NavigatorService)) => ({

        signIn: (credentials: SignInRequestModel) => {
            patchState(store, { isLoading: true, error: null })

            authService.signIn(credentials).subscribe({
                next: (response) => {
                    patchState(store, {
                        user: response.user,
                        accessToken: response.accessToken,
                        isLoading: false
                    })
                    toaster.success(`Dobrodošli, ${response.user.name}!`)
                    router.navigateByUrl(navigator.get())
                },
                error: (err) => {
                    const msg = err?.error?.detail
                    patchState(store, {
                        error: msg,
                        isLoading: false
                    })
                    toaster.error(msg)
                }
            })
        },

        signUp: (userData: SignUpRequestModel) => {
            patchState(store, { isLoading: true, error: null })

            authService.signUp(userData).subscribe({
                next: (response) => {
                    patchState(store, {
                        user: response.user,
                        accessToken: response.accessToken,
                        isLoading: false
                    })
                    toaster.success('Nalog uspešno kreiran!')
                    router.navigateByUrl(navigator.get())
                },
                error: (err) => {
                    const msg = err?.error?.detail
                    patchState(store, {
                        error: msg,
                        isLoading: false
                    })
                    toaster.error(msg)
                }
            })
        },

        signOut: () => {
            authService.signOut()
            patchState(store, {
                user: null,
                accessToken: null
            })
            toaster.success('Uspešno ste se odjavili!')
            router.navigate(['/products/svi'])
        },

        loadUserFromStorage: () => {
            const token = authService.getToken()
            const user = authService.getCurrentUser()

            if (token && user) {
                patchState(store, { user, accessToken: token })
            }
        }
    }))
)