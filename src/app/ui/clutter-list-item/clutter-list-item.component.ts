import { Component, Input } from '@angular/core';
import { Clutter, AddClutterData } from '../../shared/models';
import { ClutterService } from '../../shared/services/clutter.service';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  constructor(
    private clutterService: ClutterService
  ) { }

  @Input() clutter!: Clutter

  mode: 'VOTE' | 'EDIT' = 'VOTE'

  onChangeToEditMode() {
    this.mode = 'EDIT'
  }

  onChangeToVoteMode() {
    this.mode = 'VOTE'
  }

  onUpdateClutter(clutter: AddClutterData) {
    this.clutterService.update(this.clutter._id, clutter).subscribe({
      next: (result) => {
        this.clutter.name = clutter.name
        this.clutter.description = clutter.description
        this.onChangeToVoteMode()
      }
    })
  }
}
