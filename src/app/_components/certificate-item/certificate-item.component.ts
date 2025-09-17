import { Component, Input } from '@angular/core';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { Router } from '@angular/router';
import { Certificate } from '../../interface/certificate';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificate-item',
  imports: [SecondaryButtonComponent, DatePipe],
  templateUrl: './certificate-item.component.html',
  styleUrl: './certificate-item.component.css',
})
export class CertificateItemComponent {
  @Input() certificate!: Certificate;

  constructor(private router: Router) {}

  redirectToCertificate() {
    this.router.navigate(['/certificate', this.certificate.id]);
  }
}
