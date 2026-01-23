import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-forms-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './forms-reactive.html',
  styleUrl: './forms-reactive.scss',
})
export class FormsReactive implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
        last: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      color: ['#000000'],
      date: ['2024-01-01'],
      age: [18, [Validators.required, Validators.min(18), Validators.max(101)]],
      category: [''],
      agree: [false, Validators.requiredTrue],
      gender: [''],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', Validators.required],
      rangeNum: this.formBuilder.group({
        minNum: ['', Validators.required],
        maxNum: ['', Validators.required]
      }),
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]]
    }, {
      validators: [MyValidators.matchPasswords, MyValidators.rangeValidator]
    });

    this.typeField?.valueChanges.subscribe(v => {
      if (v === 'company'){
        this.companyNameField?.setValidators([Validators.required]);
      } else {
        this.companyNameField?.setValidators(null);
      }
      this.companyNameField?.updateValueAndValidity();
    })
  }

  get nameField(){ return this.form.get('fullName.name'); }
  get lastField(){ return this.form.get('fullName.last'); }
  get emailField(){ return this.form.get('email'); }
  get phoneField(){ return this.form.get('phone'); }
  get colorField(){ return this.form.get('color'); }
  get dateField(){ return this.form.get('date'); }
  get ageField(){ return this.form.get('age'); }
  get categoryField(){ return this.form.get('category'); }
  get agreeField(){ return this.form.get('agree'); }
  get genderField(){ return this.form.get('gender'); }
  get typeField(){ return this.form.get('type'); }
  get companyNameField(){ return this.form.get('companyName'); }

  ngOnInit(): void {
    this.nameField!.valueChanges.subscribe((value) => {
    })
  }

  getNameValue(){
    alert(this.nameField!.value);
  }

  save(){
    alert('wepaaaaa')
  }
}
