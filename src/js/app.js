
$(() => {

  console.log('loaded');

  // VARIABLES timer and play game
  const $timerText = $('#timerText');
  const $gameplayArea = $('.gameplayArea');
  let initialSound = true;
  let gameMusicVar = true;
  const wordsOnScreen = [];
  const wordList = ['banana', 'pen', 'fight', 'robot', 'noodle', 'chicken', 'flip', 'wobble', 'shiny', 'apple', 'pineapple', 'bruise', 'punch', 'kick'];
  let levelSpeed = 4.5;
  const minTimeBetweenWords = 500;
  const maxTimeBetweenWords = 2000;
  // create special words
  const specialWordList = ['hadouken'];
  const img = document.createElement('img');
  img.style.height = '120px';
  img.src = 'https://i.imgur.com/6qkmc10.png';

  const specialWordDelay = Math.round(Math.random() * 20000);

  // VARIABLES check for match
  const $form = $('.form');
  const $input = $('#text-box');
  const $score = $('#score');
  let result = 0;

  // VARIABLES modal, play
  const $modal = $('#myModal');
  const $playBtn = $('.playBtn');
  const $pressStartSound = $('#start-sound');

  // VARIABLES NEXT LEVEL
  const $finalScoreNumber = $('.final-score-number');
  const $nextLevelScreen = $('.next-level-screen');
  const $divCongrats = $('.div-congrats');
  const $divCommiserations = $('.div-commiserations');
  const $endDiv = $('.end-div');
  const $backToMain = $('.back-to-main');
  let timerID;

  // VARIABLE SOUNDS sounds
  const $getReadyFighters = $('#get-ready');
  const $beatEmUp = $('#beat-em-up');

  // FUNCTIONS

  // SOUNDS
  function getReadySound() {
    $getReadyFighters.attr('src', '/sounds/get_ready_fighters.wav');
    $getReadyFighters.get(0).play();
  }
  function beatEmUpSound() {
    $beatEmUp.attr('src', '/sounds/get_ready_fighters.wav');
    $beatEmUp.get(0).play();
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

  let createWordsInterval = null;

  function playGame() {
    $modal.hide();
    $divCongrats.hide();
    $divCommiserations.hide();
    $nextLevelScreen.hide();
    $endDiv.hide();

    $(document).ready(function() {
      $input.focus();
    });

    if (initialSound){
      $pressStartSound.attr('src', '/sounds/pressStart.wav');
      $pressStartSound.get(0).play();
      setTimeout(getReadySound, 1000);
      initialSound = false;
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
        'src': '/sounds/hadouken.mp3'
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
    // searching the wordsOnScreen array for the index of the object with the same word as the input value. If it is found we will remove the whole element. * is this removing the entire object?
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

  const hasEndOfGame = false; //i dont think i need this - to check


  function nextLevel() {
    clearInterval(createWordsInterval);
    $finalScoreNumber.text(result);
    $score.text(0);
    $input.val('');
    $nextLevelScreen.show();
    if (result >= 1) {
      levelSpeed = Math.max(levelSpeed-1,1.5);
      $divCongrats.show();
      if (levelSpeed === 3.5){
        setTimeout(beatEmUpSound, 5000);
      }
      if (levelSpeed === 1.5){
        $endDiv.show();
        $backToMain.show();
        $divCongrats.hide();
        gameOver();
      }
    } else {
      $divCommiserations.show();
    }
    if (levelSpeed !==1.5){
      result = 0;
      timerID = setTimeout(playGame, 5000);
    }
  }

  // GAME OVER and reset function

  function gameOver() {
    if (levelSpeed > 1.5) {
      hasEndOfGame === false;
    } else {
      hasEndOfGame === true;
      clearTimeout(timerID);
    }
  }

  function resetGame() {
    levelSpeed = 4.5;
    result = 0;
    $nextLevelScreen.hide();
    $modal.show();
  }

  //AUDIO game music

  const $gameMusic = $('#game-music');
  function gameMusic() {
    $gameMusic.attr('src', '/sounds/akuma_stage.mp3');
    $gameMusic.get(0).play();
  }


  // EVENT LISTENERS
  $playBtn.on('click', playGame);

  $form.on('submit', checkForMatch);

  $backToMain.on('click', resetGame);

// End of page
});
