import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BaseUIComponent } from './_components/base-ui/base-ui.component';

import { CertificateService } from './_services/certificate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, BaseUIComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'certificate-generator';
  showNavbar: boolean = true;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    const localCertificates = localStorage.getItem('certificates');
    if (localCertificates) {
      this.certificateService.loadCertificates(JSON.parse(localCertificates));
    }
  }
}
