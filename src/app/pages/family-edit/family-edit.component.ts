import { Component, OnInit } from '@angular/core';
import { AddFamilyData } from '../../shared/models';
import { FamilyService } from '../../shared/services/family.service';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrl: './family-edit.component.scss',
  providers: [FamilyService]
})
export class FamilyEditComponent implements OnInit {

  constructor(
    private familyService: FamilyService
  ) { }

  ngOnInit(): void {
    this.familyService.loadFamily()
  }

  family$ = this.familyService.family$

  onUpdateFamily(family: AddFamilyData) {
    this.familyService.updateFamily(family)
  }

}
