import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly headerSolid = signal(false);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly whatsappUrl =
    'https://wa.me/554884926447?text=Ol%C3%A1%20Franciele!%20Gostaria%20de%20agendar%20uma%20aula%20experimental.';
  protected readonly instagramUrl = 'https://www.instagram.com/francielebernardopersonal';
  protected readonly instagramHandle = 'francielebernardopersonal';

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
}
