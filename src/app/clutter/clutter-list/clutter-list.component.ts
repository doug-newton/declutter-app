import { Component } from '@angular/core';
import { ClutterService, Clutter } from '../clutter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clutter-list',
  templateUrl: './clutter-list.component.html',
  styleUrl: './clutter-list.component.scss'
})
export class ClutterListComponent {
  constructor(private clutterService: ClutterService) { }

  clutter$: Observable<Clutter[]> = this.clutterService.getClutter()
}
