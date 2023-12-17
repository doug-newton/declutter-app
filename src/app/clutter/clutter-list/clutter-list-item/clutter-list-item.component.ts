import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {
  @Input() clutter

  hasDescription() {
    if (this.clutter.description == null) return false
    if (this.clutter.description === '') return false
    return true
  }
}
