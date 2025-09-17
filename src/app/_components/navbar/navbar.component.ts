import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CertificateService } from '../../_services/certificate.service';
import { Certificate } from '../../interface/certificate';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, RouterModule, NgClass, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  certificates: Certificate[] = [];
  certificatesCount: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.subscription = this.certificateService.certificates$.subscribe(
      (certificates) => {
        this.certificatesCount = certificates.length;
        this.certificates = certificates;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
