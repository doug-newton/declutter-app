import { Component } from '@angular/core';
import { AddFamilyData, Family } from '../family.models';
import { FamilyService } from '../family.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrl: './create-family.component.scss'
})
export class CreateFamilyComponent {

  constructor(
    private auth: AuthService,
    private familyService: FamilyService,
    private router: Router
  ) { }

  onCreateFamily(familyData: AddFamilyData) {
    this.familyService.createFamily(familyData).subscribe({
      next: () => this.auth.refreshToken()
    })
  }
}
