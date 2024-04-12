import { gsap } from "gsap";

export function animationSpanStart(span: HTMLElement | null | ChildNode, input: any, mount?: boolean): void {
    if (span && input.value.length === 0 && mount) return
    if (span && input.value.length !== 0) { gsap.to(span, { duration: 0.01, y: -10, fontSize: "8px" }); return }
    gsap.to(span, { duration: 0.2, y: -10, fontSize: "8px" });
}

export function animationSpanFinish(span: HTMLElement | null | ChildNode, input: string): void {
    if (input.length === 0) {
        gsap.to(span, { duration: 0.2, y: 0, fontSize: "14px" });
        return
    } else {
        return
    }
}

export function animateModalIn(): void {
    gsap.from("#modalBackground", { y: -100, opacity: 0, duration: 0.5 });
    gsap.from(".white-block", { y: 100, opacity: 0, scaleX: 0, transformOrigin: "center bottom", duration: 0.5, delay: 0.3 });
    return
}

export function appearTable(): void {
    gsap.from("#table-container", { x: "100%", ease: "power2.out", duration: 0.7 });
    gsap.from("#table-container", { opacity: 0, duration: 0.5, delay: 0.2, });
    return
}

export function appearNav(): void {
    gsap.from("#nav", { x: "-100%", ease: "power2.out", duration: 0.7 });
    gsap.from("#nav", { opacity: 0, duration: 0.5, delay: 0.2, });
    return
}

export function sentForm(arr: HTMLInputElement[]): void {
    arr.forEach((input) => {
        const span = input.nextSibling;
        gsap.to(span, { duration: 0.2, y: 0, fontSize: "14px" })
    });
}