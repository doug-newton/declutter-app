import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Family, FamilyMember } from '../../shared/models';

@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrl: './family-view.component.scss'
})
export class FamilyViewComponent {

  @Input() family: Family
  @Input() userId: string
  @Output() onEditClicked = new EventEmitter()
  @Output() onRemoveMember = new EventEmitter<FamilyMember>()
  @Output() onAddMember = new EventEmitter<string>()

  cols = ['name', 'email', 'actions']

  memberIsOwner(member: FamilyMember): boolean {
    return this.family.owner._id == member._id
  }

  userIsOwner(): boolean {
    return this.family.owner._id == this.userId
  }

  removeMember(member: FamilyMember) {
    this.onRemoveMember.emit(member)
  }

  addMember(email: string){
    this.onAddMember.emit(email)
  }

}
