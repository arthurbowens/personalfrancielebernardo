import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  role: ChatRole;
  text: string;
}

interface ChatQuestion {
  key: string;
  label: string;
  question: string;
  quickReplies?: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild('chatScroll') private chatScrollRef?: ElementRef<HTMLDivElement>;

  protected readonly headerSolid = signal(false);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly whatsappNumber = '554884926447';
  protected readonly whatsappUrl =
    'https://wa.me/554884926447?text=Ol%C3%A1%20Franciele!%20Gostaria%20de%20agendar%20uma%20aula%20experimental.';
  protected readonly instagramUrl = 'https://www.instagram.com/francielebernardopersonal';
  protected readonly instagramHandle = 'francielebernardopersonal';
  protected readonly profilePhoto = '/foto2.jpeg';

  protected readonly chatOpen = signal(false);
  protected readonly chatTyping = signal(false);
  protected readonly chatDone = signal(false);
  protected readonly chatStep = signal(0);
  protected readonly chatMessages = signal<ChatMessage[]>([]);
  protected readonly chatAnswers = signal<Record<string, string>>({});
  protected readonly draftAnswer = signal('');
  protected readonly summaryWhatsappUrl = signal(this.whatsappUrl);

  private readonly questions: ChatQuestion[] = [
    {
      key: 'nome',
      label: 'Nome',
      question: 'Oi! 💕 Eu sou a Franciele. Como você se chama?',
    },
    {
      key: 'idade',
      label: 'Idade',
      question: 'Prazer em te conhecer! Qual é a sua idade?',
    },
    {
      key: 'objetivo',
      label: 'Objetivo',
      question: 'Qual é o seu principal objetivo com os treinos?',
      quickReplies: [
        'Emagrecimento',
        'Ganho de massa',
        'Definição corporal',
        'Condicionamento',
        'Qualidade de vida',
      ],
    },
    {
      key: 'experiencia',
      label: 'Experiência',
      question: 'Há quanto tempo você treina?',
    },
    {
      key: 'local_horario',
      label: 'Local e horário',
      question: 'Onde você pretende treinar e qual horário você tem livre?',
    },
    {
      key: 'frequencia',
      label: 'Frequência',
      question: 'Quantas vezes por semana você consegue treinar?',
      quickReplies: ['2x', '3x', '4x', '5x ou mais'],
    },
    {
      key: 'duracao',
      label: 'Duração do treino',
      question: 'Quanto tempo você tem disponível por treino?',
      quickReplies: ['30 min', '45 min', '1 hora', '1h30'],
    },
    {
      key: 'restricoes',
      label: 'Restrições',
      question: 'Possui alguma restrição médica, lesão ou dor que devemos considerar?',
      quickReplies: ['Nenhuma', 'Dor nas costas', 'Dor no joelho', 'Outra (vou descrever)'],
    },
  ];

  protected readonly results = [
    { src: '/resultado1.jpeg', alt: 'Resultado de aluna 1' },
    { src: '/resultado2.jpeg', alt: 'Resultado de aluna 2' },
    { src: '/resultado3.jpeg', alt: 'Resultado de aluna 3' },
    { src: '/resultado4.jpeg', alt: 'Resultado de aluna 4' },
    { src: '/resultado5.jpeg', alt: 'Resultado de aluna 5' },
    { src: '/resultado6.jpeg', alt: 'Resultado de aluna 6' },
    { src: '/resultado7.jpeg', alt: 'Resultado de aluna 7' },
    { src: '/resultado8.jpeg', alt: 'Resultado de aluna 8' },
  ];

  protected readonly currentSlide = signal(0);

  protected readonly features = [
    {
      icon: 'dumbbell',
      title: 'Treinos Personalizados',
      description: 'Feitos para o seu objetivo.',
    },
    {
      icon: 'clipboard',
      title: 'Acompanhamento Individual',
      description: 'Suporte, orientação e ajustes constantes.',
    },
    {
      icon: 'chart',
      title: 'Evolução de Verdade',
      description: 'Resultados reais e consistentes.',
    },
  ];

  protected readonly benefits = [
    'Treino totalmente personalizado',
    'Avaliação física inclusa',
    'Planejamento completo para todo o mês',
    'Acompanhamento profissional contínuo',
    'Ajustes frequentes conforme sua evolução',
    'Suporte para esclarecer dúvidas',
    'Estratégia alinhada aos seus objetivos',
  ];

  protected readonly appFeatures = [
    'Treino completo na palma da mão',
    'Vídeos demonstrativos de cada exercício',
    'Mais autonomia para treinar',
    'Suporte contínuo',
    'Ajustes estratégicos conforme sua evolução',
  ];

  protected readonly targetAudience = [
    'Mulheres que desejam emagrecer com saúde',
    'Mulheres que querem ganhar massa muscular',
    'Mulheres que buscam definição corporal',
    'Quem deseja melhorar o condicionamento físico',
    'Quem precisa de mais motivação para manter a constância',
    'Quem quer treinar com segurança e orientação profissional',
    'Quem busca mais qualidade de vida e autoestima',
  ];

  protected prevSlide(): void {
    const last = this.results.length - 1;
    this.currentSlide.update((index) => (index === 0 ? last : index - 1));
  }

  protected nextSlide(): void {
    const last = this.results.length - 1;
    this.currentSlide.update((index) => (index === last ? 0 : index + 1));
  }

  protected goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.headerSolid.set(window.scrollY > 60);
  }

  protected openChat(): void {
    this.chatOpen.set(true);
    if (this.chatMessages().length === 0) {
      this.startChat();
    }
  }

  protected closeChat(): void {
    this.chatOpen.set(false);
  }

  protected restartChat(): void {
    this.chatMessages.set([]);
    this.chatAnswers.set({});
    this.chatStep.set(0);
    this.chatDone.set(false);
    this.draftAnswer.set('');
    this.summaryWhatsappUrl.set(this.whatsappUrl);
    this.startChat();
  }

  protected onDraftInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.draftAnswer.set(value);
  }

  protected currentQuickReplies(): string[] {
    if (this.chatTyping() || this.chatDone()) {
      return [];
    }
    return this.questions[this.chatStep()]?.quickReplies ?? [];
  }

  protected selectQuickReply(answer: string): void {
    if (answer === 'Outra (vou descrever)') {
      this.draftAnswer.set('');
      return;
    }
    this.draftAnswer.set(answer);
    this.sendAnswer();
  }

  protected sendAnswer(): void {
    const answer = this.draftAnswer().trim();
    if (!answer || this.chatTyping() || this.chatDone()) {
      return;
    }

    const step = this.chatStep();
    const question = this.questions[step];
    if (!question) {
      return;
    }

    this.pushMessage('user', answer);
    this.chatAnswers.update((answers) => ({ ...answers, [question.key]: answer }));
    this.draftAnswer.set('');

    const nextStep = step + 1;
    if (nextStep < this.questions.length) {
      this.chatStep.set(nextStep);
      this.askQuestion(nextStep);
      return;
    }

    this.finishChat();
  }

  private startChat(): void {
    this.chatTyping.set(true);
    this.scrollChatToBottom();

    window.setTimeout(() => {
      this.pushMessage(
        'assistant',
        'Oi! Sou a Franciele Bernardo 💪 Vou te fazer algumas perguntinhas rápidas pra te conhecer melhor e montar um caminho mais alinhado ao seu objetivo.',
      );
      this.chatTyping.set(false);
      this.askQuestion(0);
    }, 700);
  }

  private askQuestion(index: number): void {
    const question = this.questions[index];
    if (!question) {
      return;
    }

    this.chatTyping.set(true);
    this.scrollChatToBottom();

    window.setTimeout(() => {
      this.pushMessage('assistant', question.question);
      this.chatTyping.set(false);
      this.scrollChatToBottom();
    }, 650);
  }

  private finishChat(): void {
    const answers = this.chatAnswers();
    const summaryLines = this.questions
      .map((question) => `• ${question.label}: ${answers[question.key] ?? '-'}`)
      .join('\n');

    const message = [
      'Olá Franciele! Acabei de responder o assistente da landing page.',
      '',
      summaryLines,
      '',
      'Gostaria de agendar uma aula experimental.',
    ].join('\n');

    this.summaryWhatsappUrl.set(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`);
    this.chatTyping.set(true);
    this.scrollChatToBottom();

    window.setTimeout(() => {
      this.pushMessage(
        'assistant',
        'Perfeito! Já tenho suas respostas ✨ Agora é só me chamar no WhatsApp pra gente agendar sua avaliação e começar sua transformação.',
      );
      this.chatTyping.set(false);
      this.chatDone.set(true);
      this.scrollChatToBottom();
    }, 750);
  }

  private pushMessage(role: ChatRole, text: string): void {
    this.chatMessages.update((messages) => [...messages, { role, text }]);
    this.scrollChatToBottom();
  }

  private scrollChatToBottom(): void {
    queueMicrotask(() => {
      const el = this.chatScrollRef?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
