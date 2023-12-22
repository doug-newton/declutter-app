import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Family, FamilyMember } from '../../shared/models';
import { FamilyService } from '../../shared/services/family.service';
import { AuthService } from '../../shared/services/auth.service';
import { combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrl: './family-view.component.scss',
  providers: [FamilyService]
})
export class FamilyViewComponent implements OnInit {

  constructor(
    private familyService: FamilyService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.familyService.loadFamily()
  }

  vm$ = combineLatest([
    this.familyService.family$.pipe(filter(family => family != null)),
    this.auth.userId$
  ]).pipe(
    map(([family, userId]) => ({
      family: family,
      userId: userId,
    }))
  )

  cols = ['name', 'email', 'actions']

  userIsOwner(family: Family, userId: string): boolean {
    return family.owner._id === userId
  }

  memberIsOwner(family: Family, member: FamilyMember): boolean {
    return family.owner._id === member._id
  }

  removeMember(member: FamilyMember) {
    this.familyService.removeMember(member)
  }

  addMember(email: string){
    this.familyService.addMember(email)
  }

}
