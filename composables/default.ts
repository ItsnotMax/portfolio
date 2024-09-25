import gsap from 'gsap';

export function animatePageTransition(to: HTMLElement, from: HTMLElement) {
  const timeline = gsap.timeline();

  timeline
    .to(from, { x: '-100%', duration: 0.5, ease: 'linear', zIndex: 1 }) // Сдвигаем старую страницу
    .from(to, { x: '100%', duration: 0.5, ease: 'linear', zIndex: 2 }); // Показываем новую страницу

  return timeline;
}
