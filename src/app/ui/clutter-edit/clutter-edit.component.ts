import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClutterService } from '../../shared/services/clutter.service';
import { Observable } from 'rxjs';
import { AddClutterData, Clutter } from '../../shared/models';

@Component({
  selector: 'app-clutter-edit',
  templateUrl: './clutter-edit.component.html',
  styleUrl: './clutter-edit.component.scss'
})
export class ClutterEditComponent implements OnChanges {

  constructor(
    private clutterService: ClutterService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clutterId) {
      this.clutter$ = this.clutterService.getSingleClutterObservable(this.clutterId)
    }
  }

  @Input({ required: true }) clutterId: string
  clutter$: Observable<Clutter> 

  @Output() clutterSaved = new EventEmitter()

  onUpdateClutter(clutter: AddClutterData) {
    this.clutterService.update(this.clutterId, clutter)
    this.clutterSaved.emit()
  }

}
