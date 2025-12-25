import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ContactRequest } from '../models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form class="card form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="field">
        <label for="name">Nome</label>
        <input id="name" class="input" type="text" formControlName="name" placeholder="Seu nome" />
      </div>
      <div class="field">
        <label for="email">E-mail</label>
        <input
          id="email"
          class="input"
          type="email"
          formControlName="email"
          placeholder="voce@email.com"
        />
      </div>
      <div class="field">
        <label for="phone">Telefone / WhatsApp (opcional)</label>
        <input
          id="phone"
          class="input"
          type="text"
          formControlName="phone"
          placeholder="+55 51 00000-0000"
        />
      </div>
      <div class="field">
        <label for="message">Mensagem</label>
        <textarea
          id="message"
          class="input"
          rows="4"
          formControlName="message"
          placeholder="Contexto do projeto, prazo ou dúvida"
        ></textarea>
      </div>
      <button class="btn" type="submit" [disabled]="loading || form.invalid">
        {{ loading ? 'Enviando...' : 'Enviar mensagem' }}
      </button>
    </form>

    <div class="modal-backdrop" *ngIf="showModal">
      <div class="modal">
        <h3>Mensagem enviada!</h3>
        <p>Recebi seu contato e retornarei em breve.</p>
        <p *ngIf="referenceId"><strong>Protocolo:</strong> {{ referenceId }}</p>
        <button class="btn primary" (click)="closeModal()">Fechar</button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      }
      .modal {
        background: #111025;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 20px;
        max-width: 360px;
        width: 90%;
        text-align: center;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
      }
      .btn.primary {
        margin-top: 12px;
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {
  @Output() sent = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    phone: ['', [Validators.maxLength(60)]],
    message: ['', [Validators.required, Validators.maxLength(1200)]]
  });

  loading = false;
  statusMessage = '';
  statusClass: 'success' | 'error' | '' = '';
  referenceId = '';
  showModal = false;

  constructor(private fb: FormBuilder, private api: ApiService, private cdr: ChangeDetectorRef) {}

  onSubmit(): void {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.statusMessage = '';
    this.referenceId = '';
    this.showModal = false;

    const payload = this.form.value as ContactRequest;
    this.api
      .sendContact(payload)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (res) => {
          this.statusClass = 'success';
          this.referenceId = res.referenceId;
          this.showModal = true;
          this.form.reset();
          this.sent.emit();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.statusClass = 'error';
          this.statusMessage = 'Não foi possível enviar agora. Tente novamente em instantes.';
          this.cdr.markForCheck();
        }
      });
  }

  closeModal(): void {
    this.showModal = false;
    this.statusMessage = '';
    this.referenceId = '';
    this.cdr.markForCheck();
  }
}

