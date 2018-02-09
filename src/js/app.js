
$(() => {

  console.log('loaded');

  // MODAL -
  const $modal = $('#myModal');
  const $playBtn = $('.playBtn');

  $playBtn.on('click', () => {
    $modal.hide();
    // playGame function to be invoked
  });

  // GAME

  // VARIABLES
  const $timerText = $('#timerText');
  console.log($timerText);

  // PLAY GAME FUNCTION
  // function playGame() {
  // timer();
  //
  // }

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
          }
          $timerText.html(time);
        }, 1000);
      }
    }

  // CREATE WORDS
  const $gameplayArea = $('.gameplayArea');

  const wordsOnScreen = [];
  const wordList = ['banana', 'pineapple', 'chihuahua'];
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  let $changeMe = $('#change-me');


  function createWords() {
    let $newWordElement = $gameplayArea.append( '<p>Test</p>' );
    wordsOnScreen.push(randomWord);
    console.log(wordsOnScreen);
    $changeMe.text(wordsOnScreen);
  }

createWords()









//DON'T DELETE End of page
});
