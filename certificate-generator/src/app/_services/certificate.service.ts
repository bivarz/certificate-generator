import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Certificate } from '../interface/certificate';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private certificatesSubject = new BehaviorSubject<Certificate[]>([]);
  certificates$ = this.certificatesSubject.asObservable();

  loadCertificates(certificates: Certificate[]) {
    this.certificatesSubject.next(certificates);
  }

  addCertificate(certificate: Certificate) {
    const current = this.certificatesSubject.value;
    current.push(certificate);
    this.certificatesSubject.next([...current]);
    localStorage.setItem('certificates', JSON.stringify(current));
  }
}
