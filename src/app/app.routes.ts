import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductCreateComponent } from './features/product-create/product-create.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: '/produtos', pathMatch: 'full' },
      { path: 'produtos', component: ProductListComponent, canActivate: [AuthGuard] },
      { path: 'cadastro-produto', component: ProductCreateComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];
