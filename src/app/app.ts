import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly whatsappUrl = 'https://wa.me/5548999999999?text=Ol%C3%A1%20Franciele!%20Gostaria%20de%20agendar%20uma%20aula%20experimental.';
  protected readonly instagramUrl = 'https://www.instagram.com/';

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
  protected readonly features = [
    {
      icon: 'dumbbell',
      title: 'Treinos Personalizados',
      description: 'Feitos para o seu objetivo.',
    },
    {
      icon: 'clipboard',
      title: 'Acompanhamento Individual',
      description: 'Suporte e ajustes constantes.',
    },
    {
      icon: 'chart',
      title: 'Evolução de Verdade',
      description: 'Resultados reais e consistentes.',
    },
  ];
}
