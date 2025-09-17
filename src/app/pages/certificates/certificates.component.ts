import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../../_components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../_components/secondary-button/secondary-button.component';
import { CertificateItemComponent } from '../../_components/certificate-item/certificate-item.component';
import { RouterLink } from '@angular/router';
import { CertificateService } from '../../_services/certificate.service';
import { Certificate } from '../../interface/certificate';

@Component({
  selector: 'app-certificates',
  imports: [SecondaryButtonComponent, CertificateItemComponent, RouterLink],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css',
})
export class CertificatesComponent implements OnInit {
  constructor(private certificateService: CertificateService) {}
  certificates: Certificate[] = [];
  ngOnInit(): void {
    this.certificateService.certificates$.subscribe((certificates) => {
      this.certificates = certificates.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }
}
