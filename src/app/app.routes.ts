import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products/svi' },
    { path: 'products/:category', loadComponent: () => import('./pages/products-grid/products-grid'), },
    { path: 'products/details/:productId', loadComponent: () => import('./pages/view-product-detail/view-product-detail'), },
    { path: 'wishlist', loadComponent: () => import('./pages/my-wishlist/my-wishlist') },
    { path: 'cart', loadComponent: () => import('./pages/view-cart/view-cart') },
    { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout'), canActivate: [authGuard] },
    { path: 'order-success', loadComponent: () => import('./pages/order-success/order-success'), canActivate: [authGuard] },
    { path: 'profile', loadComponent: () => import('./pages/profile/profile'), canActivate: [authGuard] },
    { path: '**', redirectTo: 'products/svi' },
];
