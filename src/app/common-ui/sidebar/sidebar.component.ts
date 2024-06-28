import { Component, inject } from '@angular/core';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [SubscriberCardComponent, RouterModule, CommonModule, ImgUrlPipe],
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList(3);
  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
