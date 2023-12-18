import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AddClutterData, ClutterService } from '../clutter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-clutter',
  templateUrl: './add-clutter.component.html',
  styleUrl: './add-clutter.component.scss'
})
export class AddClutterComponent {

  constructor(
    private clutterService: ClutterService,
    private router: Router
  ) { }

  onAddClutter(clutterData: AddClutterData) {
    this.clutterService.addClutter(clutterData).subscribe({
      next: () => this.router.navigate(['/clutter/list'])
    })
  }

}
