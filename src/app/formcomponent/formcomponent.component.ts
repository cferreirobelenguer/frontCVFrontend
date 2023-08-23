import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BackendService } from './services/form';

@Component({
  selector: 'app-formcomponent',
  templateUrl: './formcomponent.component.html',
  styleUrls: ['./formcomponent.component.scss']
})
export class FormcomponentComponent implements OnInit {
  public user: FormGroup;
  public selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService
    ) {
    this.user = this.fb.group({
      //validators formControl
      name: new FormControl('', [Validators.pattern(/^[A-Za-z]+$/), Validators.required, Validators.minLength(2)]),
      tel: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)],),
      email: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      pdf: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public onSubmit () {
      //values inputs
      const formData = new FormData();
      formData.append('name', this.user.controls['name'].value);
      formData.append('tel', this.user.controls['tel'].value);
      formData.append('email', this.user.controls['email'].value);
      if (this.selectedFile instanceof File) {
        formData.append('pdf', this.selectedFile);
      }

      this.backendService.uploadDataWithFile(formData).subscribe(
        (response) => {
          console.log('Datos y archivo subidos con éxito:', response);
        },
        (error) => {
          console.error('Error al subir datos y archivo:', error);
        }
      );
    }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.user.get('pdf')?.setValue(file);
      } else {
        this.user.get('pdf')?.setValue(null);
        event.target.value = null; // Clear the input field
      }
    }
  }
}





