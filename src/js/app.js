
$(() => {

  console.log('loaded');

  // VARIABLES timer and play game
  const $timerText = $('#timerText');
  const $gameplayArea = $('.gameplayArea');
  const wordsOnScreen = [];
  const wordElements = [];
  const wordTimers = [];
  const wordList = ['banana', 'pineapple', 'chihuahua', 'robot', 'noodle', 'chicken', 'boo', 'wobble', 'shiny'];
  let levelSpeed = 5;
  let timeoutId;
  let timerOutId;

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
    let time = 20;
    let countDown = null;
    countDown = setInterval(() => {
      time--;
      if (time === 0) {
        console.log('time is zero');
        clearInterval(countDown);
        clearTimeout(createWordsInterval);
        $gameplayArea.empty();
      }
      $timerText.html(time);
    }, 1000);
  }

  // WORD PLAY

  let createWordsInterval = null;

  function playGame() {
    $modal.hide();
    // function runCreateWords is generating a random number which is being apssed into the timeout function. The timeout is calling the createWords function at a random interval passing  in rand as an argument.
    function createWords() {
      const delay = Math.round(Math.random() * 2500) + 2500;
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      // const randomWord = 'chicken';
      wordsOnScreen.push(randomWord);
      const $word = $('<p>', { text: randomWord, class: 'word' });
      wordElements.push($word);
      $gameplayArea.append($word);
      $word.animate({ left: '100vw' }, levelSpeed * 1000, 'linear', () => {
        if(!$word.hasClass('removed')) {
          $word.remove();
          const wordIndex = wordsOnScreen.indexOf(randomWord);
          wordsOnScreen.splice(wordIndex, 1);
          wordElements.splice(wordIndex, 1);
        }
      });
      console.log('word created', wordsOnScreen);

      createWordsInterval = setTimeout(createWords, delay);
      // const wordTimer = setTimeout(() => {
      //   const wordIndex = wordsOnScreen.indexOf(randomWord);
      //   wordsOnScreen.splice(wordIndex, 1);
      //   wordElements.splice(wordIndex, 1)[0].remove();
      //   console.log('word removed', wordsOnScreen);
      // }, levelSpeed * 1000);
      // wordTimers.push(wordTimer);
    }

    createWords();
    // createWords is creating a random word from an array and pushing it into an empty array. The const key is generating a random interger which is being passed in as the id of the random word generated, allowing the specific word to be removed when the removeWord function is called.
    // function createWords(){
    //   const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    //   wordsOnScreen.push(randomWord);
    //   console.log('wordsOnScreen:', wordsOnScreen);
    //   //
    //   const $wordScroll = $('.wordScroll');
    //   $wordScroll.css('animation', `moveRight ${levelSpeed}s linear infinite`);
    //   //
    //   $gameplayArea.append(`<p id="${randomWord}" class="wordScroll">${randomWord}</p>`);
    //   timeoutId = setTimeout(() => {
    //     removeWordFromScreen(randomWord);
    //   }, levelSpeed * 1000);
    // }
    timer();
  }



  // function removeWordFromScreen(word) {
  //   const $word = $(`#${word}`);
  //   // when we call the function, above, we pass in randomWord as word in this case. This function takes any word. const word in the createWords scenario is selecting the whole DOM element, with the ID of the word, in this case, the random word.
  //   if ($word) {
  //     $word.remove();
  //     wordsOnScreen = wordsOnScreen.filter(word => word !== $word.html());
  //     // if the word is part of the wordsOnScreen array, we filter to create a new array, consisting of all words that do not have the same html as our current randomWord.
  //   }
  // }

  // CHECK FOR MATCH

  function checkForMatch(e) {
    e.preventDefault();
    console.log('checking for match...');
    const foundIndex = wordsOnScreen.indexOf($input.val());
    if(foundIndex > -1) {
      wordsOnScreen.splice(foundIndex, 1);
      const $word = wordElements.splice(foundIndex, 1)[0];
      $word.addClass('removed');
      $word.remove();
      result++;
      $score.text(result);
      console.log('yay');
    }
    $input.val('');
    // wordsOnScreen.forEach(wordInArray => {
    //   if (wordInArray === $input.val()) {
    //     result ++;
    //     $score.text(result);
    //     // removeWordFromScreen(wordInArray);
    //     // word in array is the current one being passed in from the forEach function.
    //     wordList = wordList.filter(word => word !== wordInArray);
    //     // wordList is being filtered to create a new array of words that are not our word.
    //     console.log('yay');
    //   }
    //   $input.val('');
    // });
  }

  $form.on('submit', checkForMatch);

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
    if (result >= 2) {
      $congrats.text('Congratulations!');
      $level2Btn.show();
    } else {
      $congrats.text('Sorry but your score is not high enough');
      $resetButton.show();
    }
  }

  // EVENT LISTENERS
  $playBtn.on('click', playGame);

  $resetButton.on('click', playGame);

  $level2Btn.on('click', () => {
    ///
    clearInterval(createWordsInterval);
    clearInterval(timerOutId);
    clearInterval(timeoutId);

    levelSpeed = 1;
    // $wordScroll.css('animation', `moveRight ${levelSpeed}s linear infinite`);
    ///
    $modal.hide();
    playGame();
    checkForMatch();
    timer();
  });

// End of page
});
