import { Component, OnInit } from '@angular/core';
import { ClutterService, Clutter } from '../clutter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clutter-list',
  templateUrl: './clutter-list.component.html',
  styleUrl: './clutter-list.component.scss'
})
export class ClutterListComponent implements OnInit {
  constructor(private clutterService: ClutterService) { }

  ngOnInit(): void {
    this.clutterService.getClutter()
  }

  clutter$: Observable<Clutter[]> = this.clutterService.clutter$
}
