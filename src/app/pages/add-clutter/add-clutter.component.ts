import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddClutterData } from '../../shared/models';
import { ClutterService } from '../../shared/services/clutter.service';

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
