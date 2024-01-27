import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ClutterService } from '../../shared/services/clutter.service';
import { Clutter } from '../../shared/models';

@Component({
  selector: 'app-editable-clutter-card',
  templateUrl: './editable-clutter-card.component.html',
  styleUrl: './editable-clutter-card.component.scss'
})
export class EditableClutterCard implements OnChanges {

  constructor(
    private clutterService: ClutterService
  ) { }

  @Input({ required: true }) clutterId: string

  @Output() changeToEditMode = new EventEmitter()

  clutter$: Observable<Clutter>

  vm$: Observable<{
    clutter: Clutter
  }>

  onEdit() {
    this.changeToEditMode.emit()
  }

  onDelete() {
    this.clutterService.delete(this.clutterId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.hasOwnProperty('clutterId')) {
      return
    }

    this.clutter$ = this.clutterService.getSingleClutterObservable(this.clutterId)

    this.vm$ = combineLatest([
      this.clutter$,
    ]).pipe(
      map(([
        clutter
      ]) => ({ clutter }))
    )
  }
}
