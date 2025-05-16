// Enhanced SupremeAmer Word Connect Game
// Features: sound system, reward system, hint button

const WORDS = [
  "nft", "hide", "defi", "veil", "skin", "skrill", "stock", "mining", "website",
  "bitcoin", "secret", "furtive", "covert", "latent", "conceal", "hideout",
  "forex", "stocks", "secrete", "stash", "hider", "hideling", "hiddle", "skulk",
  "lurk", "finance", "disguise", "investment", "rawhide", "private", "trading",
  "nfts", "blindfold", "cryptography", "wrapper", "dogecoin", "equities",
  "excoriate", "derma", "plaintext", "mcafee", "paddle box", "abstruse", "secrecy",
  "mithe", "mask", "cutis", "palliate", "oxhide", "unapparent", "cover", "hideaway",
  "invisible", "hide away", "loinskin", "mulch", "wattson", "meme", "funds",
  "undercover", "gaming", "reinsure", "stable", "fund", "stonks", "skinless",
  "secretly", "card", "mirage", "smart", "revenant", "decentralization", "binance",
  "coverer", "malware", "determinism", "syllogisms", "kernel", "philo", "viruses",
  "regnant", "gnostic", "moby", "ssh", "cypher", "scob", "ultranationalism", "pinko",
  "screen smoke", "epidermis", "hele", "fiat", "pellage", "beshroud", "dermis",
  "occult", "market", "canopy", "paypal", "recondite", "skinner", "overhele",
  "obscure", "goatskin", "hiddenness", "coverage", "secretion", "cutaneous",
  "mysterious", "obscurely", "penetralia", "deerskin", "enshroud", "camouflage",
  "bescreen", "security", "blockchain", "clandestine", "concealment", "surreptitious",
  "stablecoin", "wiggery", "recursion", "steganography", "sovietism", "neoconservativism"
];

// Utility to shuffle array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Generate circular letter selector for a word
function getLetters(word) {
  return shuffle(Array.from(word.replace(/ /g, '').toUpperCase()));
}

function generateGrid(word) {
  return Array.from(word.replace(/ /g, '').toUpperCase());
}

// Sound System
export const SoundSystem = {
  correct: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa6cae.mp3'), // short reward sound
  wrong: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_12d8bfb6fa.mp3'), // short wrong sound
  hint: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_1247e13c57.mp3'), // short click sound
  play(sound) {
    if (this[sound]) {
      this[sound].currentTime = 0;
      this[sound].play();
    }
  }
};

export class WordConnectGame {
  constructor(words) {
    this.level = 0;
    this.words = words;
    this.completedLevels = [];
    this.currentWord = this.words[this.level];
    this.grid = generateGrid(this.currentWord);
    this.letters = getLetters(this.currentWord);
    this.input = "";
    this.found = new Set();
    this.sacPoint = 0;
    this.hintCost = 0;
    this.hintRevealedIdx = [];
    this.maxLevel = words.length;
    this.setHintCost();
  }

  getCurrentReward() {
    let reward = 100 * (this.level + 1); // Level 1: 100, Level 2: 200, etc.
    if (reward > 3000000) reward = 3000000;
    return reward;
  }

  setHintCost() {
    // Hint cost: level 1-10 = 20; level 11-50 = 100; level 51-100 = 1k; level 101+ = 10k
    if (this.level < 10) this.hintCost = 20;
    else if (this.level < 50) this.hintCost = 100;
    else if (this.level < 100) this.hintCost = 1000;
    else this.hintCost = 10000;
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
      this.hintRevealedIdx = [];
      this.setHintCost();
    } else {
      alert('Congratulations! You finished all levels!');
    }
  }

  tryWord(word) {
    if (word.replace(/ /g, '').toLowerCase() === this.currentWord.replace(/ /g, '').toLowerCase()) {
      this.found.add(word.toUpperCase());
      const reward = this.getCurrentReward();
      this.sacPoint += reward;
      SoundSystem.play('correct');
      setTimeout(()=>this.nextLevel(), 500);
      return { correct: true, reward };
    }
    SoundSystem.play('wrong');
    return { correct: false, reward: 0 };
  }

  useHint() {
    // Reveal 1 or 2 random grid letters
    if (this.sacPoint < this.hintCost) {
      alert("Not enough $SAC-point for hint!");
      return null;
    }
    let unrevealed = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.hintRevealedIdx.includes(i)) unrevealed.push(i);
    }
    if (unrevealed.length === 0) return null;
    let revealCount = Math.min(2, unrevealed.length);
    let revealedNow = [];
    for (let i = 0; i < revealCount; i++) {
      let idx = unrevealed.splice(Math.floor(Math.random()*unrevealed.length), 1)[0];
      this.hintRevealedIdx.push(idx);
      revealedNow.push(idx);
    }
    this.sacPoint -= this.hintCost;
    SoundSystem.play('hint');
    return revealedNow; // return array of revealed indices
  }
}

export default WordConnectGame;
