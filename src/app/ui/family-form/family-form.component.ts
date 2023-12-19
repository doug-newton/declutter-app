import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddFamilyData } from '../../shared/models';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrl: './family-form.component.scss'
})
export class FamilyFormComponent implements AfterContentInit {

  ngAfterContentInit(): void {
    if (this.familyToEdit) {
      this.familyForm.patchValue(this.familyToEdit)
    }
  }

  @Input() title
  @Input() actionText
  @Input() familyToEdit
  @Output() familyData = new EventEmitter<AddFamilyData>

  familyForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] })
  })

  onSave() {
    if (!this.familyForm.valid) {
      return
    }

    this.familyData.emit({
      name: this.familyForm.value.name!
    })
  }
}
