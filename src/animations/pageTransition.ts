import gsap from "gsap";

export function fadeInPage(element: HTMLElement | null) {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
  );
}

export function staggerCards(elements: HTMLElement[]) {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
  );
}
