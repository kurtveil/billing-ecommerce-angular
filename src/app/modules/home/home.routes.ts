// home.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BillingComponent } from '../billing/billing.component';

export const homeRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        children: [
            {
              path: 'products',
              loadChildren: () =>
                import('../products/products.routes').then(
                  (m) => m.productsRoutes
                ),
            },
            {
              path: 'transactions',
              component: BillingComponent
            },
          ],
    }
];