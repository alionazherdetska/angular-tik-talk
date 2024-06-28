import { Component, ViewChild, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      const profile = this.profileService.me();
      if (profile) {
        this.form.patchValue({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          username: profile.username || '',
          description: profile.description || '',
          stack: this.mergeStack(profile.stack),
        });
      }
    });
  }

  async onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      throw new Error('Form is invalid');
    }

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar),
      );
    }

    try {
      await firstValueFrom(
        this.profileService.patchProfile({
          firstName: this.form.get('firstName')?.value || '',
          lastName: this.form.get('lastName')?.value || '',
          username: this.form.get('username')?.value || '',
          description: this.form.get('description')?.value || '',
          stack: this.splitStack(this.form.get('stack')?.value || ''),
        }),
      );
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;
    return stack.split(',').map((item) => item.trim());
  }

  mergeStack(stack: string | null | string[] | undefined): string {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(', ');
    return stack;
  }
}
