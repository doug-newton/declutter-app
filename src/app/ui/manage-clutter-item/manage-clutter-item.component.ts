import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manage-clutter-item',
  templateUrl: './manage-clutter-item.component.html',
  styleUrl: './manage-clutter-item.component.scss'
})
export class ManageClutterItemComponent {

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
