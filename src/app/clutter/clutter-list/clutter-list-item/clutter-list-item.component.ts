import { Component, Input } from '@angular/core';
import { Clutter, ClutterService } from '../../clutter.service';
import { UsersService } from '../../../shared/users.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  constructor(
    private clutterService: ClutterService,
    private usersService: UsersService,
    private auth: AuthService
  ) { }

  @Input() clutter!: Clutter
}
