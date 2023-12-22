import { AfterContentInit, Component } from '@angular/core';
import { FamilyService } from '../../shared/services/family.service';
import { Observable } from 'rxjs';
import { AddFamilyData, Family, FamilyMember } from '../../shared/models';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-manage-family',
  templateUrl: './manage-family.component.html',
  styleUrl: './manage-family.component.scss',
  providers: [FamilyService]
})
export class ManageFamilyComponent implements AfterContentInit {

  constructor(private familyService: FamilyService, private auth: AuthService) { }

  ngAfterContentInit(): void {
    this.familyService.loadFamily()
  }

  mode : 'VIEW' | 'EDIT' = 'VIEW'

  familyId$: Observable<string> = this.auth.familyId$
  family$: Observable<Family> = this.familyService.family$
  userId$: Observable<string> = this.auth.userId$

  onUpdateFamily(family: AddFamilyData) {
    this.familyId$.subscribe({
      next: familyId => {
        this.familyService.updateFamily(family)
        this.changeToViewMode()
      }
    })
  }

  onRemoveMember(member: FamilyMember) {
    this.familyService.removeMember(member)
  }

  onAddMember(email: string){
    this.familyService.addMember(email)
  }

  changeToEditMode() {
    this.mode = 'EDIT'
  }

  changeToViewMode() {
    this.mode = 'VIEW'
  }

}
