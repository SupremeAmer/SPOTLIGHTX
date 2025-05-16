// SupremeAmer Word Connect Game

// Crossword grid layout
// Each cell: {row, col, letter, filled, colorClass}
// The grid is designed to match the layout in the image.

const crosswordLayout = [
  // 7 rows x 6 columns
  // Use null for empty cell, and { letter: '', colorClass: '' } for filled.
  // Row 0
  [null, null, {letter: 'U'}, {letter: 'P'}, null, null],
  // Row 1
  [null, null, {letter: 'A'}, null, null, null],
  // Row 2
  [{letter: 'U'}, {letter: 'A'}, {letter: 'P'}, {letter: 'E'}, null, null],
  // Row 3
  [null, null, {letter: 'T'}, null, {letter: 'A'}, {letter: 'T'}],
  // Row 4
  [null, null, {letter: 'P'}, {letter: 'E'}, null, null],
  // Row 5
  [null, null, null, {letter: 'E'}, null, null],
  // Row 6
  [null, null, null, null, null, null]
];

// Solution words and their grid positions for this level
const solutionWords = [
  { word: "UP", positions: [[0,2],[0,3]] },
  { word: "AT", positions: [[3,4],[3,5]] },
  { word: "APE", positions: [[2,2],[2,3],[2,4]] },
  { word: "PAT", positions: [[2,1],[3,2],[3,3]] },
  { word: "PE", positions: [[4,2],[4,3]] },
  { word: "TAPE", positions: [[3,2],[3,3],[4,3],[5,3]] },
  { word: "U", positions: [[2,0]] },
  { word: "A", positions: [[2,1]] },
  { word: "E", positions: [[5,3]] },
  { word: "P", positions: [[4,2]] },
  { word: "T", positions: [[3,2]] }
];

// Letters to use in the word connect wheel
let letters = ['U', 'T', 'D', 'A', 'P', 'E'];

// Utility to deep copy the layout and mask all cells
function getBlankGrid(layout) {
  return layout.map(row => row.map(cell => {
    if (cell && cell.letter) {
      return { ...cell, filled: false, display: '', colorClass: cell.colorClass || '' };
    }
    return null;
  }));
}

let userGrid = getBlankGrid(crosswordLayout);

const crosswordContainer = document.querySelector('.crossword');
const currentWordEl = document.getElementById('current-word');
const lettersContainer = document.querySelector('.letters');
const connectLines = document.querySelector('.connect-lines');

// Draw the crossword grid
function renderCrossword() {
  crosswordContainer.innerHTML = '';
  userGrid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('crossword-cell');
      if (!cell) {
        cellDiv.classList.add('empty');
        cellDiv.innerHTML = '';
      } else {
        cellDiv.setAttribute('data-row', r);
        cellDiv.setAttribute('data-col', c);
        if (cell.filled) {
          cellDiv.classList.add('filled');
          if (cell.colorClass) cellDiv.classList.add(cell.colorClass);
          cellDiv.textContent = cell.letter;
        } else {
          cellDiv.textContent = '';
        }
      }
      crosswordContainer.appendChild(cellDiv);
    });
  });
}

// Arrange the letters in a circle
function renderLetters() {
  lettersContainer.innerHTML = '';
  const center = { x: 100, y: 100 };
  const radius = 75;
  const angleStep = 2 * Math.PI / letters.length;
  letters.forEach((letter, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center.x + radius * Math.cos(angle) - 28;
    const y = center.y + radius * Math.sin(angle) - 28;
    const letterBtn = document.createElement('button');
    letterBtn.classList.add('letter-btn');
    letterBtn.style.transform = `translate(${x}px, ${y}px)`;
    letterBtn.textContent = letter;
    letterBtn.setAttribute('data-letter', letter);
    letterBtn.setAttribute('data-idx', i);
    letterBtn.addEventListener('mousedown', onLetterStart);
    letterBtn.addEventListener('touchstart', onLetterStart, {passive:false});
    lettersContainer.appendChild(letterBtn);
  });
}

let selectedLetters = [];
let selectedIndices = [];
let isDragging = false;

// Draw connect lines between selected letters
function drawLines() {
  connectLines.innerHTML = '';
  if (selectedIndices.length < 2) return;
  const btns = [...lettersContainer.children];
  for (let i = 1; i < selectedIndices.length; i++) {
    const fromBtn = btns[selectedIndices[i-1]];
    const toBtn = btns[selectedIndices[i]];
    const fromRect = fromBtn.getBoundingClientRect();
    const toRect = toBtn.getBoundingClientRect();
    // Relative to the SVG container
    const svgRect = connectLines.getBoundingClientRect();
    const fromX = fromRect.left + fromRect.width/2 - svgRect.left;
    const fromY = fromRect.top + fromRect.height/2 - svgRect.top;
    const toX = toRect.left + toRect.width/2 - svgRect.left;
    const toY = toRect.top + toRect.height/2 - svgRect.top;
    const line = document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute('x1', fromX);
    line.setAttribute('y1', fromY);
    line.setAttribute('x2', toX);
    line.setAttribute('y2', toY);
    line.setAttribute('stroke', '#fa66b9');
    line.setAttribute('stroke-width', '6');
    line.setAttribute('stroke-linecap', 'round');
    connectLines.appendChild(line);
  }
}

// Touch/mouse controls for selecting letters
function onLetterStart(e) {
  e.preventDefault();
  isDragging = true;
  selectedLetters = [];
  selectedIndices = [];
  handleLetterSelect(e.target);
  highlightLetterBtn(e.target);
  document.addEventListener('mousemove', onLetterMove);
  document.addEventListener('touchmove', onLetterMove, {passive:false});
  document.addEventListener('mouseup', onLetterEnd);
  document.addEventListener('touchend', onLetterEnd);
}

function onLetterMove(e) {
  e.preventDefault();
  let touch = e.touches ? e.touches[0] : e;
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el && el.classList.contains('letter-btn')) {
    handleLetterSelect(el);
    highlightLetterBtn(el);
  }
  drawLines();
  updateCurrentWord();
}

function onLetterEnd(e) {
  isDragging = false;
  document.removeEventListener('mousemove', onLetterMove);
  document.removeEventListener('touchmove', onLetterMove);
  document.removeEventListener('mouseup', onLetterEnd);
  document.removeEventListener('touchend', onLetterEnd);
  drawLines();
  checkWord();
  setTimeout(() => {
    clearHighlights();
    selectedLetters = [];
    selectedIndices = [];
    updateCurrentWord();
    drawLines();
  }, 350);
}

function handleLetterSelect(el) {
  const idx = parseInt(el.getAttribute('data-idx'));
  if (selectedIndices.includes(idx)) return;
  selectedLetters.push(el.getAttribute('data-letter'));
  selectedIndices.push(idx);
}

function highlightLetterBtn(el) {
  el.classList.add('active');
}

function clearHighlights() {
  document.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
}

function updateCurrentWord() {
  currentWordEl.textContent = selectedLetters.join('');
}

// Check if the selected word matches any solution
function checkWord() {
  const word = selectedLetters.join('');
  let found = false;
  for (const sol of solutionWords) {
    if (sol.word === word) {
      // Fill its positions on the crossword
      sol.positions.forEach(([r,c], idx) => {
        userGrid[r][c].filled = true;
        userGrid[r][c].display = userGrid[r][c].letter;
        // Color for special words
        if (word === 'APE') userGrid[r][c].colorClass = 'purple';
        if (word === 'AT') userGrid[r][c].colorClass = 'secondary';
      });
      found = true;
    }
  }
  renderCrossword();
  if (found) {
    currentWordEl.textContent = word + " ✓";
    setTimeout(() => currentWordEl.textContent = '', 800);
  }
}

// Shuffle letters
document.getElementById('shuffle-btn').addEventListener('click', () => {
  letters = letters.sort(() => Math.random() - 0.5);
  renderLetters();
  clearHighlights();
  drawLines();
});

// Hint: Highlight a random incomplete word
document.getElementById('hint-btn').addEventListener('click', () => {
  let incomplete = solutionWords.filter(sol =>
    !sol.positions.every(([r,c]) => userGrid[r][c].filled)
  );
  if (incomplete.length === 0) return;
  let sol = incomplete[Math.floor(Math.random() * incomplete.length)];
  sol.positions.forEach(([r,c]) => {
    const idx = r * 6 + c;
    const cellDiv = crosswordContainer.children[idx];
    if (cellDiv) cellDiv.classList.add('highlight');
  });
  setTimeout(() => renderCrossword(), 1200);
});

// Initial render
renderCrossword();
renderLetters();
updateCurrentWord();
