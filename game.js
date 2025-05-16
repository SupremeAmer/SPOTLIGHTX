// SupremeAmer Word Connect Game
// Inspired by the design in the provided image
// Words for each level are provided in the user message

const WORDS = [
  "nft", "hide", "defi", "veil", "skin", "skrill", "stock", "mining",
  "website", "bitcoin", "secret", "furtive", "covert", "latent", "conceal",
  "hideout", "forex", "stocks", "secrete", "stash", "hider", "hideling",
  "hiddle", "skulk", "lurk", "finance", "disguise", "investment", "rawhide",
  "private", "trading", "nfts", "blindfold", "cryptography", "wrapper",
  "dogecoin", "equities", "excoriate", "derma", "plaintext", "mcafee",
  "paddle box", "abstruse", "secrecy", "mithe", "mask", "cutis", "palliate",
  "oxhide", "unapparent", "cover", "hideaway", "invisible", "hide away",
  "loinskin", "mulch", "wattson", "meme", "funds", "undercover", "gaming",
  "reinsure", "stable", "fund", "stonks", "skinless", "secretly", "card",
  "mirage", "smart", "revenant", "decentralization", "binance", "coverer",
  "malware", "determinism", "syllogisms", "kernel", "philo", "viruses",
  "regnant", "gnostic", "moby", "ssh", "cypher", "scob", "ultranationalism",
  "pinko", "screen smoke", "epidermis", "hele", "fiat", "pellage", "beshroud",
  "dermis", "occult", "market", "canopy", "paypal", "recondite", "skinner",
  "overhele", "obscure", "goatskin", "hiddenness", "coverage", "secretion",
  "cutaneous", "mysterious", "obscurely", "penetralia", "deerskin", "enshroud",
  "camouflage", "bescreen", "security", "blockchain", "clandestine",
  "concealment", "surreptitious", "stablecoin", "wiggery", "recursion",
  "steganography", "sovietism", "neoconservativism"
];

// Utility to shuffle array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Swap
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Generate circular letter selector for a word
function getLetters(word) {
  // Remove spaces for letter selector
  return shuffle(Array.from(word.replace(/ /g, '').toUpperCase()));
}

// Generate grid for a level (simplified logic for demo)
function generateGrid(word) {
  // For simplicity, return an array representing grid positions
  // In production, you'd need a much smarter crossword generator
  return Array.from(word.replace(/ /g, '').toUpperCase());
}

// Game state
class WordConnectGame {
  constructor(words) {
    this.level = 0;
    this.words = words;
    this.completedLevels = [];
    this.currentWord = this.words[this.level];
    this.grid = generateGrid(this.currentWord);
    this.letters = getLetters(this.currentWord);
    this.input = "";
    this.found = new Set();
  }

  nextLevel() {
    this.completedLevels.push(this.currentWord);
    this.level++;
    if(this.level < this.words.length) {
      this.currentWord = this.words[this.level];
      this.grid = generateGrid(this.currentWord);
      this.letters = getLetters(this.currentWord);
      this.input = "";
      this.found = new Set();
    } else {
      alert('Congratulations! You finished all levels!');
    }
  }

  tryWord(word) {
    if (word.replace(/ /g, '').toLowerCase() === this.currentWord.replace(/ /g, '').toLowerCase()) {
      this.found.add(word.toUpperCase());
      setTimeout(()=>this.nextLevel(), 500);
      return true;
    }
    return false;
  }
}

// Minimal HTML/CSS/JS UI (to be included in an HTML file)

export default WordConnectGame;

// Example usage in a React component or vanilla JS:
// const game = new WordConnectGame(WORDS);
// console.log(game.letters); // Letters to display in circle
// console.log(game.grid);    // Grid layout for the word
// game.tryWord('NFT');
