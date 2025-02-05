import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Iniciar Sesión',
        loadComponent: () => import('./auth/pages/login/login.component'),
    },
    {
        path: 'invoicesList',
        title: 'Facturas',
        loadComponent: () => import('./dashboard/pages/invoices-list/invoices-list.component'),
    },
    {
        path: 'createInvoice',
        title: 'Crear Factura',
        loadComponent: () => import('./dashboard/pages/create-invoice/create-invoice.component'),
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
