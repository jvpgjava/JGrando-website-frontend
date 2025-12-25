import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form.component';
import { ProfileStoreService } from '../../services/profile-store.service';
import { Observable, map } from 'rxjs';
import { ServiceItem, SkillGroup } from '../../models';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesPageComponent implements OnInit {
  services$: Observable<ServiceItem[]> = this.store.profile$.pipe(map((p) => p?.services ?? []));
  skills$: Observable<SkillGroup[]> = this.store.profile$.pipe(map((p) => p?.skills ?? []));

  constructor(private store: ProfileStoreService) {}

  ngOnInit(): void {
    this.store.ensureLoaded();
  }
}

