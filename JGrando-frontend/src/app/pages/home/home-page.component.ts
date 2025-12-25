import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form.component';
import { ProfileStoreService } from '../../services/profile-store.service';
import { iconFor } from '../../utils/icons';
import { Observable, map, OperatorFunction } from 'rxjs';
import { ExperienceItem, ProfileResponse, ProjectItem, ServiceItem, SkillGroup } from '../../models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactFormComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  profile$: Observable<ProfileResponse | null> = this.store.profile$;
  skills$: Observable<SkillGroup[]> = this.store.profile$.pipe(mapProfile((p) => p?.skills ?? []));
  experiences$: Observable<ExperienceItem[]> = this.store.profile$.pipe(mapProfile((p) => p?.experiences ?? []));
  projects$: Observable<ProjectItem[]> = this.store.profile$.pipe(mapProfile((p) => p?.projects ?? []));
  services$: Observable<ServiceItem[]> = this.store.profile$.pipe(mapProfile((p) => p?.services ?? []));

  fallback = {
    name: 'João Vitor Prestes Grando',
    headline: 'Desenvolvedor Fullstack | Java, Spring Boot, Angular',
    location: 'Cachoeirinha, RS - Brasil',
    email: 'joaovitorpg1234@gmail.com',
    phone: '+55 51 98522-2903',
    summary:
      'Experiência em backends Java/Spring e frontends Angular, com foco em escalabilidade, observabilidade e UX.',
    socials: [
      { label: 'GitHub', url: 'https://github.com/jvpgjava', type: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jvprestessg', type: 'linkedin' },
      { label: 'WhatsApp', url: 'https://wa.me/5551985222903', type: 'whatsapp' },
      { label: 'Instagram', url: 'https://www.instagram.com', type: 'instagram' }
    ]
  };

  constructor(private store: ProfileStoreService) {}

  ngOnInit(): void {
    this.store.ensureLoaded();
  }

  iconFor(type: string) {
    return iconFor(type);
  }
}

function mapProfile<T>(fn: (p: ProfileResponse | null) => T): OperatorFunction<ProfileResponse | null, T> {
  return map(fn);
}

