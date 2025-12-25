import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileStoreService } from '../../services/profile-store.service';
import { Observable, map } from 'rxjs';
import { ExperienceItem, PersonalInfo, SkillGroup } from '../../models';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements OnInit {
  info$: Observable<PersonalInfo | null> = this.store.profile$.pipe(map((p) => p?.personalInfo ?? null));
  experiences$: Observable<ExperienceItem[]> = this.store.profile$.pipe(map((p) => p?.experiences ?? []));
  skills$: Observable<SkillGroup[]> = this.store.profile$.pipe(map((p) => p?.skills ?? []));

  constructor(private store: ProfileStoreService) {}

  ngOnInit(): void {
    this.store.ensureLoaded();
  }
}

