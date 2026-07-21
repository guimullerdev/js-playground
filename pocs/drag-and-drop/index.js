const board = document.querySelector('.board');

board.addEventListener('dragstart', (event) => {
  const card = event.target;
  event.dataTransfer.setData('text/plain', card.dataset.id);
  event.dataTransfer.effectAllowed = 'move';
  card.classList.add('dragging');
  console.log(`dragstart: card ${card.dataset.id}`);
});

board.addEventListener('dragend', (event) => {
  const card = event.target;
  card.classList.remove('dragging');
  console.log(`dragend: card ${card.dataset.id}`);
});

document.querySelectorAll('.column').forEach((column) => {
  column.addEventListener('dragover', (event) => {
    event.preventDefault();
    column.classList.add('drag-over');
  });

  column.addEventListener('dragleave', () => {
    column.classList.remove('drag-over');
  });

  column.addEventListener('drop', (event) => {
    event.preventDefault();
    column.classList.remove('drag-over');

    const id = event.dataTransfer.getData('text/plain');
    const card = document.querySelector(`.card[data-id="${id}"]`);
    column.appendChild(card);

    console.log(`drop: card ${id} moved to "${column.dataset.column}"`);
  });
});
