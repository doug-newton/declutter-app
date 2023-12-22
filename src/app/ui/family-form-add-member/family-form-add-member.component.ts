import { AfterContentInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Family } from '../../shared/models';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AsyncValidateFn } from 'mongoose';

@Component({
  selector: 'app-family-form-add-member',
  templateUrl: './family-form-add-member.component.html',
  styleUrl: './family-form-add-member.component.scss'
})
export class FamilyFormAddMemberComponent implements AfterContentInit {

  ngAfterContentInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email, this.usedEmailValidator.bind(this)],
      })
    })
  }

  @Input() family: Family
  @Output() onAdded = new EventEmitter<string>

  @ViewChild('formDirective') private formDirective: FormGroupDirective;

  form: FormGroup

  onSubmit() {
    if (!this.form.valid) {
      return
    }

    console.log(this.form.value.email)
    this.onAdded.emit(this.form.value.email!)

    this.form.reset()
    this.formDirective.resetForm()
  }

  usedEmailValidator(control: FormControl) {
    for (let member of this.family.members) {
      if (control.value === member.email) {
        return { 'emailAlreadyInUse': true }
      }
    }
    return null
  }
}
