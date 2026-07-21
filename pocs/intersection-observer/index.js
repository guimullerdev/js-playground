const boxes = document.querySelectorAll('.box');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const id = entry.target.dataset.id;

      if (entry.isIntersecting) {
        console.log(`Box ${id} entered viewport (ratio: ${entry.intersectionRatio.toFixed(2)})`);
        entry.target.classList.add('visible');
      } else {
        console.log(`Box ${id} left viewport`);
        entry.target.classList.remove('visible');
      }
    }
  },
  {
    root: null,
    threshold: 0.5,
  }
);

boxes.forEach((box) => observer.observe(box));
