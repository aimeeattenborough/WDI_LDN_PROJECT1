
$(() => {

  console.log('loaded');

  // VARIABLES timer and play game
  const $timerText = $('#timerText');
  const $gameplayArea = $('.gameplayArea');
  const wordsOnScreen = [];
  const wordList = ['banana', 'pineapple', 'chihuahua', 'robot', 'noodle', 'chicken', 'boo', 'wobble', 'shiny'];
  const specialWordList = ['special'];
  let levelSpeed = 5;
  let initialSound = true;
  //
  const minTimeBetweenWords = 500;
  const maxTimeBetweenWords = 2500;

  // VARIABLES check for match
  const $form = $('.form');
  const $input = $('#text-box');
  const $score = $('#score');
  let result = 0;

  // VARIABLES modal, play
  const $modal = $('#myModal');
  const $playBtn = $('.playBtn');
  const $audio = $('audio');

  // VARIABLES NEXT LEVEL
  const $finalScoreNumber = $('.final-score-number');
  const $nextLevelScreen = $('.next-level-screen');
  const $divCongrats = $('.div-congrats');
  const $divCommiserations = $('.div-commiserations');

  // FUNCTIONS

  // TIMER
  function timer() {
    let time = 20;
    let countDown = null;
    $timerText.html(time);
    countDown = setInterval(() => {
      time--;
      if (time < 0) {
        console.log('time is zero');
        clearInterval(countDown);
        clearTimeout(createWordsInterval);
        $gameplayArea.empty();
        nextLevel();
      }
      $timerText.html(time);
    }, 1000);
  }

  // PLAY GAME FUNCTION

  let createWordsInterval = null;

  function playGame() {
    $modal.hide();
    $divCongrats.hide();
    $divCommiserations.hide();
    $nextLevelScreen.hide();

    if (initialSound){
      $audio.attr('src', '/sounds/pressStart.wav');
      $audio.get(0).play();
      initialSound = false;
    }

    function createWords() {
      const delay = Math.round(Math.random() * maxTimeBetweenWords) + minTimeBetweenWords;
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      const $word = $('<p>', { text: randomWord, class: 'word' });
      // const word is generating the random p DOM elements with a class of word
      wordsOnScreen.push({ word: randomWord, element: $word });
      // we are pushing randomWord into the wordsOnScreen array as an object with DOM elements $word in the object
      createWordsInterval = setTimeout(createWords, delay);
      animateWord($word, levelSpeed * 1000);
    }

    const specialWordDelay = Math.round(Math.random() * 20000);
    function createSpecialWord() {
      const specialWord = specialWordList[Math.floor(Math.random() * specialWordList.length)];
      const $word = $('<p>', { text: specialWord, class: 'word special' });
      wordsOnScreen.push({ word: specialWord, element: $word, class: 'special' });
      animateWord($word, levelSpeed * 500);
    }

    function animateWord($word, speed) {
      $gameplayArea.append($word);
      // appending the DOM elements to the gameplayArea

      $word.animate({ left: '100vw' }, speed, 'linear', () => {
        const wordIndex = wordsOnScreen.findIndex(obj => obj.element === $word);
        // wordIndex is searching wordsOnScreen - find the object that has the element that is the same as the DOM $word and return the index. If it is higher than -1, i.e truthy, remove this DOM element from the array
        if(wordIndex > -1) {
          $word.remove();
          wordsOnScreen.splice(wordIndex, 1);
        }
      });
    }
    setTimeout(createSpecialWord, specialWordDelay);
    createWords();
    timer();
  }

  // CHECK FOR MATCH

  function checkForMatch(e) {
    e.preventDefault();
    console.log('checking for match...');
    // searching the wordsOnScreen array for the index of the object with the same word as the input value. If it is found we will remove the whole element. * is this removing the entire object?
    const foundIndex = wordsOnScreen.findIndex(obj => obj.word === $input.val());
    if(foundIndex > -1) {

      if (wordsOnScreen[foundIndex].class === 'special'){
        result = result + 5;
      } else {
        result++;
      }
      wordsOnScreen.splice(foundIndex, 1)[0].element.remove();
      $score.text(result);
    }
    $input.val('');
  }

  $form.on('submit', checkForMatch);

  // NEXT LEVEL FUNCTION
  const $endDiv = $('.end-div');

  function nextLevel() {
    clearInterval(createWordsInterval);
    $finalScoreNumber.text(result);
    $score.text(0);
    $input.val('');
    $nextLevelScreen.show();
    if (result >= 1) {
      levelSpeed = Math.max(levelSpeed-1,2);
      $divCongrats.show();
      if (levelSpeed === 2){
        $endDiv.show();
        $divCongrats.hide();
        return;
      }
    } else {
      $divCommiserations.show();
    }
    result = 0;
    setTimeout(playGame, 5000);
  }

  // EVENT LISTENERS
  $playBtn.on('click', playGame);

// End of page
});
