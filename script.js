
let balance = 0;
let miningSpeed = 0;
let miningInterval = null;
let progress = 0;
let task1Clicks = 0;
let task2Clicks = 0;

document.getElementById('start-mining').addEventListener('click', () => {
  miningSpeed = 10; 
  miningInterval = setInterval(() => {
    balance += miningSpeed / 3600; 
    progress += 1000;
    document.getElementById('balance').textContent = balance.toFixed(2);
    document.getElementById('mining-progress').textContent = `${(progress / 1000000000 * 100).toFixed(2)}%`;
    document.getElementById('progress-bar').value = progress;
    document.getElementById('progress-bar').max = 1000000000;
    if (progress >= 1000000000) {
      clearInterval(miningInterval);
      document.getElementById('start-mining').disabled = false;
      document.getElementById('stop-mining').disabled = true;
    }
  }, 1);
  document.getElementById('start-mining').disabled = true;
  document.getElementById('stop-mining').disabled = false;
});

document.getElementById('stop-mining').addEventListener('click', () => {
  clearInterval(miningInterval);
  document.getElementById('start-mining').disabled = false;
  document.getElementById('stop-mining').disabled = true;
});

document.getElementById('task-1').addEventListener('click', () => {
  task1Clicks++;
  document.getElementById('task-1-status').textContent = `Clicked ${task1Clicks} time(s)`;
  if (task1Clicks === 2) {
    balance += 10;
    document.getElementById('balance').textContent = balance.toFixed(2);
    document.getElementById('task-1').disabled = true;
    document.getElementById('task-1-status').textContent = 'Completed!';
  }
});

document.getElementById('task-2').addEventListener('click', () => {
  task2Clicks++;
  document.getElementById('task-2-status').textContent = `Clicked ${task2Clicks} time(s)`;
  if (task2Clicks === 2) {
    balance += 10;
    document.getElementById('balance').textContent = balance.toFixed(2);
    document.getElementById('task-2').disabled = true;
    document.getElementById('task-2-status').textContent = 'Completed!';
  }
});

document.getElementById('balance').textContent = balance.toFixed(2);
[5/4, 11:52 PM] Meta AI: ```
// Load saved data
if (localStorage.getItem('balance')) {
  balance = parseFloat(localStorage.getItem('balance'));
  document.getElementById('balance').textContent = balance.toFixed(2);
}

if (localStorage.getItem('progress')) {
  progress = parseInt(localStorage.getItem('progress'));
  document.getElementById('progress-bar').value = progress;
  document.getElementById('mining-progress').textContent = `${(progress / 1000000000 * 100).toFixed(2)}%`;
}

if (localStorage.getItem('task1Clicks')) {
  task1Clicks = parseInt(localStorage.getItem('task1Clicks'));
  document.getElementById('task-1-status').textContent = `Clicked ${task1Clicks} time(s)`;
  if (task1Clicks >= 2) {
    document.getElementById('task-1').disabled = true;
    document.getElementById('task-1-status').textContent = 'Completed!';
  }
}

if (localStorage.getItem('task2Clicks')) {
  task2Clicks = parseInt(localStorage.getItem('task2Clicks'));
  document.getElementById('task-2-status').textContent = `Clicked ${task2Clicks} time(s)`;
  if (task2Clicks >= 2) {
    document.getElementById('task-2').disabled = true;
    document.getElementById('task-2-status').textContent = 'Completed!';
  }
}

// Save data on change
document.getElementById('start-mining').addEventListener('click', () => {
  // 
  localStorage.setItem('balance', balance);
  localStorage.setItem('progress', progress);
});

document.getElementById('task-1').addEventListener('click', () => {
  // 
  localStorage.setItem('task1Clicks', task1Clicks);
  localStorage.setItem('balance', balance);
});

document.getElementById('task-2').addEventListener('click', () => {
  // 
  localStorage.setItem('task2Clicks', task2Clicks);
  localStorage.setItem('balance', balance);
});

// Update progress bar and balance display
setInterval(() => {
  if (miningInterval) {
    localStorage.setItem('balance', balance);
    localStorage.setItem('progress', progress);
  }
}, 1000);
