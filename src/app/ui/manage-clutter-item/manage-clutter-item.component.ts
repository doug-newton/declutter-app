import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manage-clutter-item',
  templateUrl: './manage-clutter-item.component.html',
  styleUrl: './manage-clutter-item.component.scss'
})
export class ManageClutterItemComponent {

  @Input({ required: true }) clutterId: string

  mode: 'VOTE' | 'EDIT' = 'VOTE'

  onChangeToEditMode() {
    this.mode = 'EDIT'
  }

  onChangeToVoteMode() {
    this.mode = 'VOTE'
  }
}
