import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClutterService } from '../clutter.service';

@Component({
  selector: 'app-add-clutter',
  templateUrl: './add-clutter.component.html',
  styleUrl: './add-clutter.component.scss'
})
export class AddClutterComponent {

  constructor(
    private clutterService: ClutterService
  ) { }

  clutterForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  })

  onAddClutter() {
    if (!this.clutterForm.valid) {
      return
    }

    this.clutterService.addClutter({
      name: this.clutterForm.value.name!,
      description: this.clutterForm.value.description!
    })
  }

}
