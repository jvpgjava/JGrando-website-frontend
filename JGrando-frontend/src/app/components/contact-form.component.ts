import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ContactRequest } from '../models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="card form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="field">
        <label for="name">Nome <span class="required">*</span></label>
        <input
          id="name"
          class="input"
          [class.error]="isFieldInvalid('name')"
          type="text"
          formControlName="name"
          placeholder="Seu nome"
        />
        <span class="error-message" *ngIf="isFieldInvalid('name')">
          {{ getFieldError('name') }}
        </span>
      </div>
      <div class="field">
        <label for="email">E-mail <span class="required">*</span></label>
        <input
          id="email"
          class="input"
          [class.error]="isFieldInvalid('email')"
          type="email"
          formControlName="email"
          placeholder="voce@email.com"
        />
        <span class="error-message" *ngIf="isFieldInvalid('email')">
          {{ getFieldError('email') }}
        </span>
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
        <label for="message">Mensagem <span class="required">*</span></label>
        <textarea
          id="message"
          class="input"
          [class.error]="isFieldInvalid('message')"
          rows="4"
          formControlName="message"
          placeholder="Contexto do projeto, prazo ou dúvida"
        ></textarea>
        <span class="error-message" *ngIf="isFieldInvalid('message')">
          {{ getFieldError('message') }}
        </span>
      </div>
      <button class="btn" type="submit" [disabled]="loading">
        {{ loading ? 'Enviando...' : 'Enviar mensagem' }}
      </button>
    </form>

    <div class="modal-backdrop" *ngIf="showModal" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-icon">✓</div>
        <h3>Mensagem enviada com sucesso!</h3>
        <p>Recebi seu contato e retornarei em breve.</p>
        <p *ngIf="referenceId" class="reference">Protocolo: <strong>{{ referenceId }}</strong></p>
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
        padding: 16px;
      }
      .modal {
        background: #111025;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 20px;
        max-width: 360px;
        width: 100%;
        text-align: center;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
      }
      .field label {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .required {
        color: #ef4444;
      }
      .input.error {
        border-color: #ef4444;
        outline-color: #ef4444;
      }
      .error-message {
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
        display: block;
      }
      .modal-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        background: linear-gradient(135deg, #7c3aed, #5b21b6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
      }
      .modal h3 {
        margin: 0 0 12px;
        font-size: 20px;
        color: #ffffff;
      }
      .modal p {
        margin: 0 0 8px;
        color: #d6d6e3;
        line-height: 1.5;
      }
      .reference {
        font-size: 13px;
        color: #a855f7;
        margin-top: 12px;
      }
      .reference strong {
        color: #c084fc;
        font-weight: 600;
      }
      .btn.primary {
        margin-top: 20px;
        width: 100%;
      }
      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      .modal {
        animation: modalSlideIn 0.3s ease-out;
      }
      @media (max-width: 480px) {
        .modal-backdrop {
          padding: 12px;
        }
        .modal {
          padding: 16px;
          border-radius: 10px;
        }
        .modal h3 {
          font-size: 18px;
        }
        .modal p {
          font-size: 14px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {
  @Output() sent = new EventEmitter<void>();

  form!: ReturnType<FormBuilder['group']>;

  loading = false;
  statusMessage = '';
  statusClass: 'success' | 'error' | '' = '';
  referenceId = '';
  showModal = false;
  submitted = false;

  constructor(private fb: FormBuilder, private api: ApiService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
      phone: ['', [Validators.maxLength(60)]],
      message: ['', [Validators.required, Validators.maxLength(1200)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.submitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório';
      }
      if (field.errors['email']) {
        return 'E-mail inválido';
      }
      if (field.errors['maxlength']) {
        const maxLength = field.errors['maxlength'].requiredLength;
        return `Máximo de ${maxLength} caracteres`;
      }
    }
    return '';
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid || this.loading) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      this.cdr.markForCheck();
      return;
    }

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

