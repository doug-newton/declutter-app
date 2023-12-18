import { Component, Input } from '@angular/core';
import { AddClutterData, Clutter } from '../../clutter.service';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  @Input() clutter!: Clutter

  mode: 'VOTE' | 'EDIT' = 'VOTE'

  onChangeToEditMode() {
    this.mode = 'EDIT'
  }

  onChangeToVoteMode() {
    this.mode = 'VOTE'
  }

  onUpdateClutter(clutter: AddClutterData) {
    this.onChangeToVoteMode()
  }
}
