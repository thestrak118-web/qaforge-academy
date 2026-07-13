// Ported from docs/qaforge-academy.html's burst() — a short-lived DOM particle
// burst anchored to an element, using the Web Animations API. Self-cleaning
// (each particle removes itself on animation end), so it's safe to call from
// a React event handler without any component-side cleanup.

const COLORS = ["#A3FF12", "#22D3EE", "#FBBF24", "#34D399"];

export function burst(anchor: HTMLElement) {
  const rect = anchor.getBoundingClientRect();
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;top:${
      rect.top + 30
    }px;width:7px;height:7px;border-radius:2px;pointer-events:none;z-index:999;background:${
      COLORS[i % 4]
    }`;
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 140;
    p.animate(
      [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        {
          transform: `translate(${Math.cos(ang) * dist}px,${
            Math.sin(ang) * dist + 80
          }px) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.6,.3,1)" }
    ).onfinish = () => p.remove();
  }
}
