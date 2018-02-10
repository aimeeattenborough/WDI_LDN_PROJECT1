
$(() => {

  console.log('loaded');

  // VARIABLES timer and play game
  const $timerText = $('#timerText');
  let runCreateWordsInterval = null;
  const $gameplayArea = $('.gameplayArea');
  let wordsOnScreen = [];
  const wordList = ['banana', 'pineapple', 'chihuahua', 'robot', 'noodle', 'chicken', 'turtle'];

  // VARIABLES check for match
  const $form = $('.form');
  const $input = $('#text-box');
  const $score = $('#score');
  let result = 0;

  // VARIABLES modal, play and reset button
  const $modal = $('#myModal');
  const $gameTitle = $('.game-title');
  const $playBtn = $('.playBtn');
  const $scoreBoard = $('.score-board');
  let $result = $('.result');
  const $finalScore = $('.final-score');
  const $resetButton = $('.reset-button');
  let $finalScoreNumber = $('.final-score-number');

  // FUNCTIONS

  // TIMER
  function timer() {
    let time = 30;
    let timeRunning = false;
    let countDown = null;
    timeRunning = true;
    if (timeRunning === true) {
      countDown = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(countDown);
          timeRunning = false;
          setInterval(() => {
            resetButton();
          }, 1500);
        }
        $timerText.html(time);
      }, 1000);
    }
  }

  // WORD PLAY
  function playGame() {

    // setInterval is self calling every 2 seconds and invoking the runCreateWords function

    runCreateWordsInterval = setInterval(() => {
      runCreateWords();
    }, 2000);

    // function runCreateWords is generating a random number which is being apssed into the timeout function. The timeout is calling the createWords function at a random interval passing  in rand as an argument.
    function runCreateWords() {
      const rand = Math.round(Math.random() * (3000 - 500)) + 500;
      setTimeout(function() {
        createWords();
      }, rand);
    }
    // createWords is creating a random word from an array and pushing it into an empty array. The const key is generating a random interger which is being passed in as the id of the random word generated, allowing the specific word to be removed when the removeWord function is called.
    function createWords(){
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      const key = Math.floor(Math.random() * 100);
      wordsOnScreen.push({key: key, word: randomWord});
      $gameplayArea.append(`<p id="${key}" class="wordScroll">${randomWord}</p>`);
      removeWordFromScreen(key);
    }
    // removeWord is removing the specific element with the same key id as that which has been generated in createWords, and shift is removing the first word from the wordsOnScreen array.
    function removeWordFromScreen(key) {
      setTimeout(() => {
        $('#' + key).remove();
        console.log(wordsOnScreen);
        removeWordFromArray(key);
      }, 5000);
    }
    // // removeWordFromArray is filtering through the words that don't have the current key - taking the current word out..
    function removeWordFromArray(key)  {
      wordsOnScreen = wordsOnScreen.filter(word => word.key !== key);
    }
  }

  // CHECK FOR MATCH

  function checkForMatch() {
    $form.on('submit', (e) => {
      e.preventDefault();
      wordsOnScreen.find(wordInArray => {
        console.log(wordInArray, $input.val());
        if (wordInArray.word === $input.val()) {
          result ++;
          $score.text(result);
          $input.val('');
          console.log('yay');
        }
      });
    });
  }

  // RESET BUTTON

  function resetButton() {
    clearInterval(runCreateWordsInterval);
    $finalScoreNumber.text(result);
    $modal.show();
    $gameTitle.hide();
    $playBtn.hide();
    $scoreBoard.show();
    $finalScore.show();
    $resetButton.show();
  }

  // EVENT LISTENERS

  $playBtn.on('click', () => {
    $modal.hide();
    playGame();
    checkForMatch();
    timer();
  });

// NEED TO FIX RESET BUTTON CUS HE IS DOING NOTHING ATM
  $resetButton.on('click', () => {
    $gameTitle.show();
    $playBtn.show();
    $scoreBoard.hide();
    $finalScore.hide();
    $resetButton.hide();
  });

// End of page
});


// current issues - you can enter the same input on one word over and over again the whole time it is on screen, can spam enter
