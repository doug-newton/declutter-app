import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Family, FamilyMember } from '../../shared/models';
import { FamilyService } from '../../shared/services/family.service';

@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrl: './family-view.component.scss'
})
export class FamilyViewComponent {

  constructor(
    private familyService: FamilyService
  ) { }

  @Input() family: Family
  @Input() userId: string
  @Output() onEditClicked = new EventEmitter()

  cols = ['name', 'email', 'actions']

  memberIsOwner(member: FamilyMember): boolean {
    return this.family.owner._id == member._id
  }

  userIsOwner(): boolean {
    return this.family.owner._id == this.userId
  }

  removeMember(member: FamilyMember) {
    this.familyService.removeMember(member)
  }

  addMember(email: string){
    this.familyService.addMember(email)
  }

}
