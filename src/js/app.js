
$(() => {

  console.log('loaded');

  // VARIABLES timer and play game
  const $timerText = $('#timerText');
  const $gameplayArea = $('.gameplayArea');
  let wordsOnScreen = [];
  let wordList = ['banana', 'pineapple', 'chihuahua', 'robot', 'noodle', 'chicken', 'boo', 'wobble', 'shiny'];
  let levelSpeed = 5;

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
  const $congrats = $('.congrats');
  const $finalScore = $('.final-score');
  const $resetButton = $('.reset-button');
  const $finalScoreNumber = $('.final-score-number');
  const $level2Btn = $('.level2');

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
          setTimeout(() => {
            reset();
          }, 1500);
        }
        $timerText.html(time);
      }, 1000);
    }
  }

  // WORD PLAY

  let createWordsInterval = null;

  function playGame() {

    // setInterval is self calling every 2 seconds and invoking the runCreateWords function

    createWordsInterval = setInterval(() => {
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
      wordsOnScreen.push(randomWord);
      console.log('wordsOnScreen:', wordsOnScreen);
      //
      // $gameplayArea.css('animation', `moveRight ${levelSpeed}s linear infinite`);
      //
      $gameplayArea.append(`<p id="${randomWord}" class="wordScroll">${randomWord}</p>`);
      setTimeout(() => {
        removeWordFromScreen(randomWord);
      }, levelSpeed * 1000);
    }
  }



  function removeWordFromScreen(word) {
    const $word = $(`#${word}`);
    // when we call the function, above, we pass in randomWord as word in this case. This function takes any word. const word in the createWords scenario is selecting the whole DOM element, with the ID of the word, in this case, the random word.
    if ($word) {
      $word.remove();
      wordsOnScreen = wordsOnScreen.filter(word => word !== $word.html());
      // if the word is part of the wordsOnScreen array, we filter to create a new array, consisting of all words that do not have the same html as our current randomWord.
    }
  }

  // CHECK FOR MATCH

  function checkForMatch() {
    $form.on('submit', (e) => {
      e.preventDefault();
      wordsOnScreen.forEach(wordInArray => {
        if (wordInArray === $input.val()) {
          result ++;
          $score.text(result);
          removeWordFromScreen(wordInArray);
          // word in array is the current one being passed in from the forEach function.
          wordList = wordList.filter(word => word !== wordInArray);
          // wordList is being filtered to create a new array of words that are not our word.
          console.log('yay');
        }
        $input.val('');
      });
    });
  }

  // RESET BUTTON

  function reset() {
    clearInterval(createWordsInterval);
    $finalScoreNumber.text(result);
    $modal.show();
    $gameTitle.hide();
    $playBtn.hide();
    $scoreBoard.show();
    $finalScore.show();
    $score.text(0);
    if (result >= 5) {
      $congrats.text('Congratulations!');
      $level2Btn.show();
    } else {
      $congrats.text('Sorry but your score is not high enough');
      $resetButton.show();
    }
  }

  // EVENT LISTENERS

  $playBtn.on('click', () => {
    $modal.hide();
    playGame();
    checkForMatch();
    timer();
  });

  $resetButton.on('click', () => {
    $modal.hide();
    playGame();
    checkForMatch();
    timer();
  });

  $level2Btn.on('click', () => {
    ///
    levelSpeed = 1;
    // const $wordScroll = $('.wordScroll');
    // $wordScroll.css('animation', `moveRight ${levelSpeed}s linear infinite`);
    ///
    $modal.hide();
    playGame();
    checkForMatch();
    timer();
  });

// End of page
});
