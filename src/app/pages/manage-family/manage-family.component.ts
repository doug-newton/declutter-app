import { Component } from '@angular/core';
import { FamilyService } from '../../shared/services/family.service';
import { Observable } from 'rxjs';
import { Family, FamilyMember } from '../../shared/models';

@Component({
  selector: 'app-manage-family',
  templateUrl: './manage-family.component.html',
  styleUrl: './manage-family.component.scss'
})
export class ManageFamilyComponent {
  constructor(private familyService: FamilyService) { }
  hasFamily$: Observable<boolean> = this.familyService.hasFamily$
  family$: Observable<Family> = this.familyService.family$
  familyMembers$: Observable<FamilyMember[]> = this.familyService.familyMembers$
}