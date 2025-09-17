import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SecondaryButtonComponent } from '../../_components/secondary-button/secondary-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CertificateService } from '../../_services/certificate.service';
import { Certificate } from '../../interface/certificate';
import { NotFoundComponent } from '../../_components/not-found/not-found.component';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  imports: [SecondaryButtonComponent, RouterLink, DatePipe, NotFoundComponent],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css',
})
export class CertificateComponent implements OnInit, OnDestroy {
  id: string | null = null;
  certificate: Certificate | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private certificateService: CertificateService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('certificadoContainer') certificadoElement!: ElementRef;

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.route.paramMap,
      this.certificateService.certificates$,
    ]).subscribe(([params, certificates]) => {
      this.id = params.get('id');
      this.certificate = certificates.find((cert) => cert.id === this.id);
    });
  }

  downloadCertificate() {
    if (!this.certificadoElement) return;

    html2canvas(this.certificadoElement.nativeElement, { scale: 4 }).then(
      (canvas) => {
        const link = document.createElement('a');
        link.download = `certificate_${this.certificate?.name.replaceAll(
          ' ',
          '_'
        )}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
