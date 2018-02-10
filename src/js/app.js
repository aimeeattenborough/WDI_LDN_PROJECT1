
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
  // function timer() {
  //     let time = 30;
  //     let timeRunning = false;
  //     let countDown = null;
  //     timeRunning = true;
  //     if (timeRunning === true) {
  //       countDown = setInterval(() => {
  //         time--;
  //         if (time === 0) {
  //           clearInterval(countDown);
  //           timeRunning = false;
  //         }
  //         $timerText.html(time);
  //       }, 1000);
  //     }
  //   }

  // CREATE WORDS
  const $gameplayArea = $('.gameplayArea');
  const wordsOnScreen = [];
  const wordList = ['banana', 'pineapple', 'chihuahua'];


// setInterval is self calling eveery second and invoking the runCreateWords function
  setInterval(() => {
    runCreateWords();
  }, 1000);

  // function runCreateWords is generating a random number which is being apssed into the timeout function. The timeout is calling the createWords function at a random interval passing  in rand as an argument.
  function runCreateWords() {
    const rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
      createWords();
    }, rand);
  }
  // removeWord is removing the specific element with the same key id as that which has been generated in createWords, and shift is removing the first word from the wordsOnScreen array.

  // NEED TO REMOVE VIA OBJECT KEY WORDS ON SCREEN !!!! *********
  function removeWord(key) {
    setTimeout(() => {
      $('#' + key).remove();
      console.log(wordsOnScreen);
      wordsOnScreen.shift();
    }, 5000);
  }
// //
// function removeWordFromArray(wordsOnScreen, key) {
//   wordsOnScreen.some(function(randomWord, key) {
//     return(wordsOnScreen[key])
//   })
//
// }
//
// var items = [
//   { id: 1 },
//   { id: 3 },
//   { id: 1111 },
//   { id: 43 },
//   { id: 67 },
//   { id: 12 },
// ];
//
// function removeByKey(array, params){
//   array.some(function(item, index) {
//     return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
//   });
//   return array;
// }
//
// var removed = removeByKey(items, {
//   key: 'id',
//   value: 43
// });
//
// console.log(removed);
//
//



  // createWords is creating a random word from an array and pushing it into an empty array. The const key is generating a random interger which is being passed in as the id of the random word generated, allowing the specific word to be removed when the removeWord function is called.
  function createWords(){
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const key = Math.floor(Math.random() * 100);
    wordsOnScreen.push({key: key, word: randomWord});
    $gameplayArea.append(`<p id="${key}" class="wordScroll">${randomWord}</p>`);
    removeWord(key);
  }



  // CHECK FOR MATCH

  function checkForMatch() {

  }





//DON'T DELETE End of page
});
