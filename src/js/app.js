
$(() => {
  // VARIABLES
  const minTimeBetweenWords = 500;
  const maxTimeBetweenWords = 2000;
  let levelSpeed = 4.3;
  const specialWordDelay = Math.round(Math.random() * 20000);

  //DOM DEPENDENT VARIABLES
  // VARIABLES timer and play game
  const $timerText = $('#timerText');
  const $gameplayArea = $('.gameplayArea');
  const $instructionButton = $('.instruction-button');
  let initialSound = true;
  let round1sound = true;
  let round2sound = true;
  let round3sound = true;
  let gameMusicVar = true;
  const wordsOnScreen = [];
  const wordList = ['banana', 'sushi', 'fight', 'robot', 'noodle', 'chicken', 'flip', 'wobble', 'shiny', 'apple', 'throw', 'jump', 'punch', 'kick', 'chop', 'frog'];
  let createWordsInterval = null;
  const hasEndOfGame = false;
  // create special words
  const specialWordList = ['hadouken'];
  const img = document.createElement('img');
  img.style.height = '120px';
  img.src = 'https://i.imgur.com/6qkmc10.png';

  // VARIABLES check for match
  const $form = $('.form');
  const $input = $('#text-box');
  const $score = $('#score');
  let result = 0;

  // VARIABLES modal, instructions
  const $modal = $('#myModal');
  const $playBtn = $('.playBtn');
  const $instructions = $('.instructions');

  // VARIABLES NEXT LEVEL
  const $finalScoreNumber = $('.final-score-number');
  const $nextLevelScreen = $('.next-level-screen');
  const $divCongrats = $('.div-congrats');
  const $divCommiserations = $('.div-commiserations');
  const $endDiv = $('.end-div');
  const $backToMain = $('.back-to-main');
  let timerID;

  // VARIABLE SOUNDS
  let gameMusicTimerId;
  const $gameMusic = $('#game-music');
  const $pressStartSound = $('#start-sound');
  const $clickSound = $('#click-sound');
  const $getReadyFighters = $('#get-ready');
  const $beatEmUp = $('#beat-em-up');
  const $itsShowtime = $('#its-showtime');
  const $winSound = $('#win');
  const $KO = $('#KO');


  // FUNCTIONS
  //AUDIO game music
  function gameMusic() {
    $gameMusic.attr('src', '/sounds/Akuma_stage.wav');
    $gameMusic.get(0).play();
    gameMusicTimerId = setInterval(() => {
      $gameMusic.get(0).play();
    }, 162000);
  }

  // SOUNDS
  function startSound() {
    $pressStartSound.attr('src', '/sounds/pressStart.wav');
    $pressStartSound.get(0).play();
  }
  function clickSound() {
    $clickSound.attr('src', '/sounds/clicknoise.wav');
    $clickSound.get(0).play();
  }
  function getReadySound() { //audio1
    $getReadyFighters.attr('src', '/sounds/get_ready_fighters.wav');
    $getReadyFighters.get(0).play();
  }
  function beatEmUpSound() { //audio2
    $beatEmUp.attr('src', '/sounds/beat_em_up_guys.wav');
    $beatEmUp.get(0).play();
  }
  function itsShowtime() { //audio3
    $itsShowtime.attr('src', '/sounds/its_showtime.wav');
    $itsShowtime.get(0).play();
  }
  function winShoryuken() {
    $winSound.attr('src', '/sounds/shoryuken.wav');
    $winSound.get(0).play();
  }
  function KO() {
    $KO.attr('src', '/sounds/KO.wav');
    $KO.get(0).play();
  }


  // INSTRUCTIONS
  function instructions() {
    clickSound();
    $modal.hide();
    $nextLevelScreen.show();
    $instructions.show();
    $endDiv.hide();
    initialSound = true;
    round1sound = true;
    round2sound = true;
    round3sound = true;
    gameMusicVar = true;
  }

  // TIMER
  function timer() {
    let time = 25;
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
  function inputField() {
    $input.focus();
    $input.css({outline: 'none'});
  }

  function playGame() {
    $divCongrats.hide();
    $instructions.hide();
    $divCommiserations.hide();
    $nextLevelScreen.hide();
    $endDiv.hide();
    inputField();

    if (initialSound){
      startSound();
      setTimeout(getReadySound, 1000);
      initialSound = false;
      round1sound = false;
    } else if (round1sound){
      getReadySound();
      round1sound = false;
    } else if (round2sound) {
      beatEmUpSound();
      round2sound = false;
    } else if (round3sound) {
      itsShowtime();
      round3sound = false;
    }

    if(gameMusicVar){
      gameMusic();
      gameMusicVar = false;
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

    function createSpecialWord() {
      const specialWord = specialWordList[Math.floor(Math.random() * specialWordList.length)];
      const $imgContainer = $('<div>');
      $imgContainer.css({display: 'inlineBlock', position: 'absolute'});
      $imgContainer.append(`<p style="margin-top: -16px" class="${specialWord}">${specialWord}</p></div>`);
      $imgContainer.prepend(img);
      wordsOnScreen.push({ word: specialWord, element: $imgContainer, class: 'special'});
      animateWord($imgContainer, levelSpeed * 700);
      const $hadoukenSound = $('<audio></audio>').attr({
        'src': '/sounds/hadouken.wav'
      });
      $hadoukenSound.get(0).play();
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
    // searching the wordsOnScreen array for the index of the object with the same word as the input value. If it is found we will remove the whole element.,
    const foundIndex = wordsOnScreen.findIndex(obj => obj.word === $input.val());
    if(foundIndex > -1) {
      if (wordsOnScreen[foundIndex].class === 'special'){
        result += 5;
      } else {
        result++;
      }
      wordsOnScreen.splice(foundIndex, 1)[0].element.remove();
      $score.text(result);
    }
    $input.val('');
  }

  // NEXT LEVEL FUNCTION

  function nextLevel() {
    clearInterval(createWordsInterval);
    $finalScoreNumber.text(result);
    $score.text(0);
    $input.val('');
    $nextLevelScreen.show();
    if (result >= 12) {
      levelSpeed = Math.max(levelSpeed-1,1.3);
      $divCongrats.show();
      winShoryuken();
      if (levelSpeed === 1.3){
        $endDiv.show();
        $backToMain.show();
        $divCongrats.hide();
        gameOver();
      }
    } else {
      $divCommiserations.show();
      if (levelSpeed === 4.3) round1sound = true;
      if (levelSpeed === 3.3) round2sound = true;
      if (levelSpeed === 2.3) round3sound = true;
      KO();
    }
    if (levelSpeed !==1.3){
      result = 0;
      timerID = setTimeout(playGame, 7000);
    }
  }

  // GAME OVER and reset function

  function gameOver() {
    if (levelSpeed > 1.3) {
      hasEndOfGame === false;
    } else {
      hasEndOfGame === true;
      clearTimeout(timerID);
    }
    clearInterval(gameMusicTimerId);
  }

  function resetGame() {
    levelSpeed = 4.3;
    result = 0;
    $nextLevelScreen.hide();
    $modal.show();
    $gameMusic.get(0).pause();
    $gameMusic.get(0).currentTime = 0;
  }

  // EVENT LISTENERS
  $playBtn.on('click', instructions);

  $instructionButton.on('click', playGame);

  $form.on('submit', checkForMatch);

  $backToMain.on('click', resetGame);

// End of page
});
