import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  @Input({ required: true }) clutterId: string
  @Input() showVoteCounts: boolean = true
  @Input() showUndoButton: boolean = true
  @Input() showYourVote: boolean = true
  @Input() showEditButtons: boolean = true

  mode: 'VOTE' | 'EDIT' = 'VOTE'

  onChangeToEditMode() {
    this.mode = 'EDIT'
  }

  onChangeToVoteMode() {
    this.mode = 'VOTE'
  }
}
