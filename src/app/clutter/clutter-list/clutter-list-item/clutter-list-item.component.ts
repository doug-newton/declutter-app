import { Component, Input } from '@angular/core';
import { ClutterService } from '../../clutter.service';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  constructor(private clutterService: ClutterService) { }

  @Input() clutter

  hasDescription() {
    if (this.clutter.description == null) return false
    if (this.clutter.description === '') return false
    return true
  }

  vote(vote: 'KEEP' | 'DISCARD') {
    this.clutterService.vote(this.clutter, vote).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  voteKeep() {
    this.vote('KEEP')
  }

  voteDiscard() {
    this.vote('DISCARD')
  }
}
