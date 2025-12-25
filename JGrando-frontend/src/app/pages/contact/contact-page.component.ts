import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form.component';
import { ProfileStoreService } from '../../services/profile-store.service';
import { Observable, map } from 'rxjs';
import { PersonalInfo } from '../../models';
import { iconFor } from '../../utils/icons';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent implements OnInit {
  info$!: Observable<PersonalInfo | null>;

  constructor(private store: ProfileStoreService) { }

  ngOnInit(): void {
    this.info$ = this.store.profile$.pipe(map((p) => p?.personalInfo ?? null));
    this.store.ensureLoaded();
  }

  iconFor(type: string) {
    return iconFor(type);
  }
}

