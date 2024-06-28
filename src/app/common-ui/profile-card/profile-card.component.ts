import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from '../../pages/profile-page/profile-page.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  imports: [ImgUrlPipe, RouterModule, ProfilePageComponent],
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
