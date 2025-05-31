import { ChangeDetectionStrategy, Component, inject, effect, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AgentStore } from './agent.store';

@Component({
  selector: 'lib-agent',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatTooltipModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentComponent {
  readonly agentStore = inject(AgentStore);
  selectedFiles = signal<File[]>([]);
  canSendChat = computed(() => {
    const prompt = this.agentStore.prompt();
    const agent = this.agentStore.agent();
    const loading  = this.agentStore.loading();
    const files = this.agentStore.selectedFiles();

    return !loading && (prompt.trim().length != 0 || agent === 'n8n'|| files.length > 0);
  });

  constructor() {
    effect(() => {
      const responses = this.agentStore.thread();

      if (responses.length > 1) {
        const responsesHtmlElement = document.getElementById('responses');
        if (responsesHtmlElement) {
          setTimeout(() => {
            responsesHtmlElement.scrollTop = responsesHtmlElement.scrollHeight;
          }, 0);
        }
      }
    });
  }

  setPrompt(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.agentStore.setPrompt(value);
  }

  onAgentChange(event: string): void {
    this.agentStore.setAgent(event);
  }

  onModelChange(event: string): void {
    this.agentStore.setModel(event);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.agentStore.addFiles(newFiles);
    }
  }

  removeFile(index: number): void {
    this.agentStore.removeFile(index);
  }

  sendChat(): void {
    if (!this.canSendChat()) return;
    this.agentStore.sendChat();
  }

  runTask(taskIndex: number): void {
    this.agentStore.runTask(taskIndex);
  }

  hasData(): boolean {
    const prompt = this.agentStore.prompt();
    return prompt.trim().length > 0 || this.selectedFiles.length > 0;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendChat();
    } else if (event.key === 'Escape') {
      this.agentStore.setPrompt('');
    } else if (event.key === 'ArrowUp') {
      this.agentStore.changePromptHistoryIndex(1);
    } else if (event.key === 'ArrowDown') {
      this.agentStore.changePromptHistoryIndex(-1);
    } else if (event.ctrlKey && event.altKey) {
      const taskIndex = parseInt(event.key);
      if (!isNaN(taskIndex)) {
        this.runTask(taskIndex);
      }
    }
  }
}
