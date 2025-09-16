import { Routes } from '@angular/router';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { CertificateFormComponent } from './pages/certificate-form/certificate-form.component';
import { CertificateComponent } from './pages/certificate/certificate.component';

export const routes: Routes = [
  {
    component: CertificatesComponent,
    path: '',
  },
  {
    path: 'certificate/new',
    component: CertificateFormComponent,
  },
  {
    path: 'certificate/:id',
    component: CertificateComponent,
  },
];
