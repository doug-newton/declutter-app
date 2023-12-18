import { AfterContentInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AddClutterData } from '../clutter.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-clutter-form',
  templateUrl: './clutter-form.component.html',
  styleUrl: './clutter-form.component.scss'
})
export class ClutterFormComponent implements AfterContentInit {

  constructor() { }

  @Output() clutterData = new EventEmitter<AddClutterData>()
  @Input() title: string
  @Input() actionText: string
  @Input() clutterToEdit: AddClutterData
  @ViewChild('formDirective') private formDirective: FormGroupDirective;

  ngAfterContentInit(): void {
    if (this.clutterToEdit) {
      this.clutterForm.patchValue(this.clutterToEdit)
    }
  }

  clutterForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.maxLength(250)] })
  })

  onAddClutter() {
    if (!this.clutterForm.valid) {
      return
    }

    this.clutterData.emit({
      name: this.clutterForm.value.name!,
      description: this.clutterForm.value.description!
    })

    this.clutterForm.reset()
    this.formDirective.resetForm()
  }

}
