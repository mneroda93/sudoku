let scores = [['Mark', 'Normal', '00:05:43', '28/08/2020'], // Just for demonstration purposes
  ['Aalen', 'Hard', '00:07:31', '25/01/2021'],
  ['Nimrod', 'Easy', '00:02:23', '23/05/2019']];

let sudokuBoard = document.getElementById('sudokuBoard'); // The sudoku table itself at div 'game'
let virtualTable = document.createElement('table');
let i = 0;
for (i; i < 9; i++) {
  let q = 0;
  let virtualTr = document.createElement('tr');
  for (q; q < 9; q++) {
    let virtualTd = document.createElement('td');
    virtualTd.classList.add('sudokuCell'); // Add to each of the 81 cells a class so we could get the buttons later
    virtualTd.setAttribute('id', (i + '' + q)); // Set each of the cells an id that would apply to the puzzle position
    virtualTr.appendChild(virtualTd); // for example id of '00' will apply to a cell i = 0 and j = 0 puzzle[0,0]
  }
  virtualTable.appendChild(virtualTr);
}

sudokuBoard.appendChild(virtualTable); // Add the sudoku table to the DOM

sudokuBtns = document.getElementsByClassName('sudokuCell'); // Get the buttons just added with the class 'sudokuCell'

let selected; // Selected cell at the moment by the user
let sudokuBtn;
for (sudokuBtn of sudokuBtns) { // Add functionality to each button
  sudokuBtn.addEventListener('click', function () {
    if (selected === undefined) { // If the user didn't select anything yet and he did select a button
      this.classList.add('btnSelected'); // We add the 'btnSelected' class to the cell
      selected = this; // Save the selection for future processing
    } else if (this.classList.contains('btnSelected') === false // If it's a different cell picked
      && this.classList.contains('static') === false) { // And it's not a STATIC cell(given cell after generation)
      selected.classList.remove('btnSelected'); // Remove the previous cell picked
      selected = this; // Assign the newly picked cell into selected variable
      selected.classList.add('btnSelected'); // Add a the class to the newly cell picked
    }
  });
}

let name;
let errMessageDisplayed = false;
let entrance = document.getElementById('entrance'); // Login page div
let menu = document.getElementById('menu'); // Menu page div
let message = document.getElementById('message');

document.getElementById('submit').addEventListener('click', () => {
  if (document.getElementById('login').value === "abcd" // If it's the abcd login value
    && document.getElementById('password').value === '1234') { // And it's password is 1234
    name = document.getElementById('login').value; // Assign the name of the player to the 'name' variable
    message.innerText = 'Welcome, ' + name + '!'; // Add it to DOM
    entrance.style.display = 'none';
    menu.style.display = 'block';
  } else if (errMessageDisplayed === false) { // If the error was not displayed yet, display it
    document.getElementById('error').style.display = 'block'; // No need to show the error message more than once
    errMessageDisplayed = true;
  }
});

let remAmount;
let game = document.getElementById('game');

let difficulty = document.getElementById('difficulty');
let diffBtn;

for (diffBtn of difficulty.getElementsByTagName('button')) {
  diffBtn.addEventListener('click', function () {
    if (this.innerText === 'Easy') {
      remAmount = 20;
    } else if (this.innerText === 'Normal') {
      remAmount = 40;
    } else if (this.innerText === 'Hard') {
      remAmount = 60;
    } else
      return;
    fillSudoku(remAmount);
    difficulty.style.display = 'none';
    game.style.display = 'block';
    launchTimer();
  });
}

let puzzles = [[[1, 7, 9, 3, 5, 4, 6, 8, 2],
  [8, 3, 2, 9, 1, 6, 5, 4, 7],
  [5, 6, 4, 8, 7, 2, 1, 3, 9],
  [4, 2, 7, 5, 8, 3, 9, 6, 1],
  [9, 1, 8, 4, 6, 7, 3, 2, 5],
  [6, 5, 3, 2, 9, 1, 4, 7, 8],
  [3, 4, 5, 7, 2, 9, 8, 1, 6],
  [2, 8, 1, 6, 4, 5, 7, 9, 3],
  [7, 9, 6, 1, 3, 8, 2, 5, 4]],
  [[5, 4, 3, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]],
  [[4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1, 9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9]],
  [[7, 3, 5, 6, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [9, 6, 1, 2, 8, 5, 3, 7, 4],
    [2, 8, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 9, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 2, 8, 5, 6, 1, 7, 4, 9]]];

let takenPositions = [];
let puzzle;
let fillSudoku = (remAmount) => {
  puzzle = puzzles[(Math.trunc(Math.random() * (4)))]; // Generate a random puzzle out of the 4 above
  takenPositions = []; // This array will hold all taken positions
  let amount = 81 - remAmount;
  let i = 0;
  for (i; i < amount; i++) {
    let xRnd;
    let yRnd;
    let id;
    do { // Randomly pick a position
      xRnd = Math.trunc(Math.random() * (8 + 1));
      yRnd = Math.trunc(Math.random() * (8 + 1));
      id = xRnd + '' + yRnd;
    } while (takenPositions.includes(id)); // If there is a position like that, generate again
    takenPositions.push(id); // Push the newly random position to the taken positions
    let cell = document.getElementById(id);
    cell.classList.add('static'); // Add 'static' class to each of the taken positions
    cell.innerText = '' + puzzle[xRnd][yRnd]; // Add it to the DOM
  }
};

let keyboardKeys = document.getElementsByClassName('key');
let key;
for (key of keyboardKeys) {
  key.addEventListener('click', function () {
    if (selected) {
      let indexString = '' + selected.id;
      if (takenPositions.includes(indexString) === false) {
        if (this.innerText === 'Clear') { // Clear the input from the board
          selected.innerText = '';
        } else
          selected.innerText = this.innerText; // Or just enter the numbers 1 - 9
      }
    }
  });
}

let menuBtns = menu.getElementsByTagName('button');
let instructions = document.getElementById('instructions');
let menuBtn;
let scoreBoardTableElement = document.getElementById('scoreboardTable');
for (menuBtn of menuBtns) {
  menuBtn.addEventListener('click', function () {
    if (this.innerText === 'Play') {
      menu.style.display = 'none';
      difficulty.style.display = 'block';
    } else if (this.innerText === 'Scoreboard') {
      menu.style.display = 'none';
      let scoresTable = `<table>
                            <tr>
                             <th>Name</th>
                             <th>Difficulty</th>
                             <th>Timer</th>
                             <th>Date</th>
                            </tr>`;
      let score;
      for (score of scores) {
        let data = `<tr>
                     <td>${score[0]}</td>
                     <td>${score[1]}</td>
                     <td>${score[2]}</td>
                     <td>${score[3]}</td>
                    </tr>`;
        scoresTable += data;
      }
      scoresTable += `</table>`;
      scoreBoardTableElement.innerHTML += scoresTable;
      scoreboard.style.display = 'block';
    } else if (this.innerText === 'Instructions') {
      menu.style.display = 'none';
      instructions.style.display = 'block';
    }
  });
}

let optionsButns = document.getElementById('options').getElementsByTagName('span');
let optionBtn;
for (optionBtn of optionsButns) {
  optionBtn.addEventListener('click', function () {
    if (this.innerText === 'Finish') { // If the users finishes the game
      let i = 0;
      let length = sudokuBtns.length;
      let success = true;
      start:
        for (i; i < length; i++) {
          let j = 0;
          for (j; j < 9; j++) {
            let q = 0;
            for (q; q < 9; q++) {
              let cell = document.getElementById(j + '' + q).innerText;
              if (puzzle[j][q] + '' !== cell) { // Check the input against the original sudoku board
                success = false; // If there's an error already, no need to check any further
                break start; // break the whole loop and continue
              }
            }
          }
        }
      let diffBackBtn = document.getElementById('diffBackBtn');
      diffBackBtn.classList.remove('blankMessage');
      if (success) { // If there were no errors found
        message.innerText = "Congratulations, you've done it!";
        let difficulty; // Record the win and format it correctly

        if (remAmount === 20) {
          difficulty = 'Easy';
        } else if (remAmount === 40) {
          difficulty = 'Normal';
        } else {
          difficulty = 'Hard';
        }

        if (secondsF === undefined) { // Cannot be undefined because it's humanly impossible to solve the sudoku
          secondsF = '00';
        }
        // Just right when the finish button has generated
        if (minutesF === undefined) {
          minutesF = '00';
        }// Technically it's possible, format it to be beautiful

        if (hoursF === undefined) {
          hoursF = '00';
        }

        let time = hoursF + ':' + minutesF + ':' + secondsF;
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();

        if (day < 9) {
          day = 0 + ('' + day);
        }
        if (month < 9) {
          month = 0 + ('' + month);
        }
        scores.push([name, difficulty, time, day + '/' + month + '/' + year]); // Insert the scores into the scores array
        diffBackBtn.classList.add('afterWonGame');
      } else {
        message.innerText = "Incorrect! maybe try a lower difficulty?";
        diffBackBtn.classList.add('afterLostGame');
      }
      clearSudokuBoard(); // Clear the sudoku table

      document.getElementById('game').style.display = 'none';

      diffBackBtn.innerText = 'Back to Menu';
      diffBackBtn.style.width = '150px';

      document.getElementById('difficulty').style.display = 'block'; // Get back to choose difficulty
      document.getElementById('time').innerText = '00:00:00'; // Nullify the time
      clearInterval(timer); // Clear the timer 'timer' so next time there will be a new fresh timer interval

    } else if (this.innerText === 'Again') { // Nullify all user input
      let i = 0;
      length = sudokuBtns.length;
      for (i; i < length; i++) {
        let j = 0;
        for (j; j < 9; j++) {
          let q = 0;
          for (q; q < 9; q++)
            if (takenPositions.includes(j + '' + q) === false) {// Check for taken positions
              document.getElementById(j + '' + q).innerText = ''; // Nullify them
            }
        }
      }
    } else { // New - Generates a whole sudoku board with the same difficulty with no input
      clearSudokuBoard();
      fillSudoku(remAmount);
      document.getElementById('time').innerText = '00:00:00';
      clearInterval(timer);
      launchTimer(); // Clear the timer 'timer'
    }
  });
}

let backBtns = document.getElementsByClassName('backBtn');
let backBtn;
let scoreboard = document.getElementById('scoreboard');
for (backBtn of backBtns) { // Break down the back buttons and add each of them a different functionality
  backBtn.addEventListener('click', function () {
    if (this.id === 'diffBackBtn') {
      if (message.innerText !== '') {
        message.innerText = '';
      }
      this.classList.remove('afterWonGame', 'afterLostGame');
      this.classList.add('blankMessage');
      difficulty.style.display = 'none';
      menu.style.display = 'block';
    } else if (this.id === 'instBackBtn') {
      instructions.style.display = 'none';
      menu.style.display = 'block';
    } else if (this.id === 'scoreBackBtn') {
      scoreBoardTableElement.innerHTML = '';
      scoreboard.style.display = 'none';
      menu.style.display = 'block';
    }
  });
}

let clearSudokuBoard = () => { // make each cell with no text at all
  let i = 0;
  length = sudokuBtns.length;
  for (i; i < length; i++) {
    let j = 0;
    for (j; j < 9; j++) {
      let q = 0;
      for (q; q < 9; q++) {
        let cell = document.getElementById(j + '' + q);
        cell.innerText = '';
        cell.classList.remove('static');
        if (selected) {
          selected.classList.remove('btnSelected');
        }
      }
    }
  }
};

let timer;
let timerElement = document.getElementById('time');

let secondsF;
let minutesF;
let hoursF;


function launchTimer() {

  let seconds = 1;
  let minutes = 0;
  let hours = 0;

  timer = setInterval(() => {

    if (seconds < 10) {
      secondsF = '0' + seconds;
    } else
      secondsF = seconds;
    if (minutes < 10) {
      minutesF = '0' + minutes;
    } else
      minutesF = minutes;
    if (hours < 10) {
      hoursF = '0' + hours;
    } else
      hoursF = hours;

    timerElement.innerText = hoursF + '' + ':' + minutesF + ':' + secondsF; // put the new time into the DOM

    if (seconds === 59) { // No need to show 60 seconds, just add 1 to minutes and nullify seconds
      seconds = 0;
      minutes += 1;
    } else
      seconds += 1;

    if (minutes === 59) { // No need to show 60 minutes, just add 1 to hours and nullify minutes
      minutes = 0;
      hours += 1;
    }

  }, 1000) // Every second(1000 millis)
}
