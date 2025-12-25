import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { ServicesPageComponent } from './pages/services/services-page.component';
import { ProjectsPageComponent } from './pages/projects/projects-page.component';
import { AboutPageComponent } from './pages/about/about-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'servicos', component: ServicesPageComponent },
  { path: 'projetos', component: ProjectsPageComponent },
  { path: 'sobre', component: AboutPageComponent },
  { path: 'contato', component: ContactPageComponent },
  { path: '**', redirectTo: '' }
];

