import { Component, Input, ViewChild } from '@angular/core';
import { PrimaryButtonComponent } from '../../_components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../_components/secondary-button/secondary-button.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificate } from '../../interface/certificate';
import { CertificateService } from '../../_services/certificate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-form',
  imports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './certificate-form.component.html',
  styleUrl: './certificate-form.component.css',
})
export class CertificateFormComponent {
  constructor(
    private certificateService: CertificateService,
    private route: Router
  ) {}
  @ViewChild('form') form!: NgForm;

  name: string = '';
  activity: string = '';

  certicateValues: Certificate = {
    id: '',
    name: '',
    activities: [],
    createdAt: '',
  };
  invalidField(control: NgModel) {
    return control.touched && control.invalid;
  }
  isValidActivity(): boolean {
    return !this.activity || this.activity.trim().length === 0;
  }
  isValidForm() {
    return !(
      this.certicateValues.activities.length > 0 &&
      this.certicateValues.name.length > 0
    );
  }
  addNewActivity() {
    if (this.activity.length === 0) return;
    this.certicateValues.activities.push(this.activity);
    this.activity = '';
  }
  deleteActivity(index: number) {
    this.certicateValues.activities.splice(index, 1);
  }

  getDate() {
    const date = new Date();
    this.certicateValues.createdAt = date.toISOString();
  }

  submitCertificateForm() {
    if (this.isValidForm()) return;

    this.getDate();
    this.certicateValues.id = crypto.randomUUID();

    this.certificateService.addCertificate(this.certicateValues);

    this.route.navigate(['certificate', this.certicateValues.id]);
  }

  initialState() {
    return {
      id: '',
      name: '',
      activities: [],
      createdAt: '',
    };
  }
}
