import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ToolCatalogComponent } from './pages/tool-catalog/tool-catalog';
import { AddToolComponent } from './pages/add-tool/add-tool';
import { UserProfileComponent } from './pages/user-profile/user-profile';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tools', component: ToolCatalogComponent },
  { path: 'add-tool', component: AddToolComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: '**', redirectTo: '' },
];