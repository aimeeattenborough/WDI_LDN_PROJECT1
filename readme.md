![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 1 - Street Typer II

For our first project, we were required to build an in-browser game using HTML, CSS and JavaScript (jQuery library used). Street Typer II is a speed typing game styled on the popular gaming franchise, Street Fighter. Animated words appear on screen and the player is required to type as many as many as possible in the time limit. The game features 3 levels in increasing in difficulty.

##### [Visit website](https://street-typer.herokuapp.com/) for best playing experience (the game was not designed for mobile).


<p align="center"><img src="https://i.imgur.com/4B5IXRz.png" width="700"></p>

###### Each level the player has 25 seconds to type as many words as possible as they animate across the screen. The words and intervals they appear at are picked at random. Once the words disappear off screen the user can no longer submit them.


<p align="center"><img src="https://imgur.com/Z2mQLZf.png" width="700"></p>

###### Each word that is submitted correctly earns the player 1 point. A bonus hadouken is generated at random which animates faster than the other words on screen. If the player manages to type this it earns them 5 points.

<p align="center"><img src="https://i.imgur.com/bGaEQRJ.png" width="700"></p>


###### The game requires the submission of 12 words each round in order to proceed to the next level. If the user fails to do so they are able to retry the level.

---

Overall I am pleased with the final product, which I feel looks good and plays well. The game could be developed into a larger game with additional challenges to further test the player’s skills.

With more time I would have liked to add extra levels, a leaderboard and additional bonus items such as a power-up to slow down time could be added.

A particular challenge in this project was finding a cohesive concise way to remove the words from the game, both on screen and in the DOM. This was solved by creating objects that contained both the 'word on screen' and the dom element, allowing me to splice both at the same time.


Also specific ideas you have for developing the game further if you had more time.
