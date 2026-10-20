// Sample flashcards – replace or expand this array
const flashcards = [
  { term: "Photosynthesis", definition: "The process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water." },
  { term: "Mitochondria", definition: "Organelles that generate most of the chemical energy needed to power the cell's biochemical reactions." },
  { term: "Gravity", definition: "A force that attracts two bodies toward each other; on Earth it gives weight to physical objects." },
  { term: "Algorithm", definition: "A step-by-step procedure or formula for solving a problem or completing a task." },
  { term: "Democracy", definition: "A system of government in which power is vested in the people, who rule either directly or through elected representatives." },
  { term: "Entropy", definition: "A measure of disorder or randomness in a system; in thermodynamics, it tends to increase over time." },
  { term: "API", definition: "Application Programming Interface – a set of rules that allows different software applications to communicate with each other." },
  { term: "Photosynthesis", definition: "Process used by plants to convert light energy into chemical energy stored in glucose." } // duplicate example removed in real use
];

// Remove the accidental duplicate if present
const uniqueCards = flashcards.filter((card, index, self) =>
  index === self.findIndex(c => c.term === card.term)
);

let cards = [...uniqueCards];
let currentIndex = 0;
let isFlipped = false;

// DOM elements
const flashcardEl = document.getElementById('flashcard');
const termEl = document.getElementById('term');
const definitionEl = document.getElementById('definition');
const currentIndexEl = document.getElementById('current-index');
const totalCardsEl = document.getElementById('total-cards');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const flipBtn = document.getElementById('flip-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const resetBtn = document.getElementById('reset-btn');

// Initialize
function init() {
  totalCardsEl.textContent = cards.length;
  showCard();
  updateButtons();
}

// Display current card
function showCard() {
  const card = cards[currentIndex];
  termEl.textContent = card.term;
  definitionEl.textContent = card.definition;
  currentIndexEl.textContent = currentIndex + 1;

  // Reset flip state
  isFlipped = false;
  flashcardEl.classList.remove('flipped');
}

// Flip the card
function flipCard() {
  isFlipped = !isFlipped;
  flashcardEl.classList.toggle('flipped');
}

// Go to next card
function nextCard() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    showCard();
    updateButtons();
  }
}

// Go to previous card
function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    showCard();
    updateButtons();
  }
}

// Shuffle the deck
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  currentIndex = 0;
  showCard();
  updateButtons();
}

// Reset to original order
function resetCards() {
  cards = [...uniqueCards];
  currentIndex = 0;
  showCard();
  updateButtons();
}

// Enable/disable navigation buttons
function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
}

// Event listeners
flipBtn.addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);
shuffleBtn.addEventListener('click', shuffleCards);
resetBtn.addEventListener('click', resetCards);

// Also allow clicking the card itself to flip
flashcardEl.addEventListener('click', flipCard);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    if (e.key === ' ') flipCard();
    else nextCard();
  } else if (e.key === 'ArrowLeft') {
    prevCard();
  } else if (e.key === 'f' || e.key === 'F') {
    flipCard();
  }
});

// Start the app
init();