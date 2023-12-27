import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  @Input({ required: true }) clutterId: string

  mode: 'VOTE' | 'EDIT' = 'VOTE'

  onChangeToEditMode() {
    this.mode = 'EDIT'
  }

  onChangeToVoteMode() {
    this.mode = 'VOTE'
  }
}
