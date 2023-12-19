import { Component } from '@angular/core';
import { FamilyService } from '../../shared/services/family.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AddFamilyData } from '../../shared/models';

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
      next: () => {
        this.auth.refreshToken().subscribe({
          next: () => this.router.navigate(['/clutter/add'])
        })
      }
    })
  }
}
