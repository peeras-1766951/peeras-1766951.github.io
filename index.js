/* Peerapong Peter Saksommon
   October 8, 2018
   CSE 154 Section AC
   This is the Javascript scriptsheet for my index page.
*/
(function () {
	"use strict";

	/** This command load every functions declared in this JS file
	 *  to run in the background of the website
	 */
	window.addEventListener("load", initialize);
	/** This function initialize the state of the page
	 *  adding event onClick to the radio buttons and
	 *  event for the start button which will start the countdown
	 *  and start the game after the countdown was finished
	 */
	function initialize() {
		window.addEventListener("keydown", function (e) {
			// space and arrow keys
			if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
		}, false);
		checkRadio();
		$("start").addEventListener("click", countDownStart);
	}
	/** This function hidden the start button and speed option
	 *  And start the countdown, once done it will start the game
	 */
	function countDownStart() {
		$("start").classList.add("hidden");
		let q = qsa(".speed-option");
		for (let i = 0; i < q.length; i++) {
			q[i].classList.add("hidden");
		}
		let i = 4;
		let text = document.createElement("p");
		text.setAttribute("id", "countdown");
		$("main").appendChild(text);
		text.innerText = i;
		setTimeout(countDown(), 1000);
		/** This function work as a for loop with time delay
		 *  to countdown and start the game once finished
		 */
		function countDown() {
			i--;
			text.innerText = i;
			if (i > 0) {
				setTimeout(countDown, 1000);
			} else {
				text.remove();
				game();
			}
		}
	}

	/** This function will add attribute to the radio buttons.
	 *  And also adding events so they will respond on click.
	 */
	function checkRadio() {
		let slow = $("slow-input");
		let normal = $("normal-input");
		let fast = $("fast-input");
		slow.addEventListener("click", function () {
			slow.setAttribute("checked", "checked");
			normal.removeAttribute("checked");
			fast.removeAttribute("checked");
		});
		normal.addEventListener("click", function () {
			normal.setAttribute("checked", "checked");
			slow.removeAttribute("checked");
			fast.removeAttribute("checked");
		});
		fast.addEventListener("click", function () {
			fast.setAttribute("checked", "checked");
			slow.removeAttribute("checked");
			normal.removeAttribute("checked");
		});
	}
	/** This function is where the game operate
	    it consist local variable such as
	    {color, canvas, ctx, score, worm, isGamerunning, targetLength, velocity,
	     apple, option, speed}
	    The function will use all these varibles in sub-function to operate the game
	 */
	function game() {
		let color = ["pink", "orange", "yellow", "olive", "cyan", "purple", "amber", "lime"];
		let canvas = $("canvas");
		let ctx = canvas.getContext("2d");
		let score = [0, 0, 0, 0, 0, 0];
		let worm = [];
		let isGamerunning = true;
		let targetLength = 3;
		let velocity = {
			x: 0,
			y: 1
		};
		let apple = {
			x: 5,
			y: 5
		};
		let option = qs("input[checked=checked]");
		let speed = option.getAttribute("value");
		worm.push({
			x: 0,
			y: 0
		});

		/** This function will combine the score inside
		 *  score array into a whole number and
     *  @returns {number} sumScore - summation of score from each digit of
     *  array of score
		 */
		function getSumScore() {
			let sumScore = 0;
			for (let i = 0; i < score.length; i++) {
				sumScore += score[i] + sumScore * 10;
			}
			return sumScore;
		}

		/** This function will move the worm into the direction
		 *  corresponding to the arrow keys that users pressed.
		 *  Also check if the user has break the rules and lose the game or not
		 */
		function moveworm() {
			let head = worm[0];
			let newHead = {
				x: head.x + velocity.x,
				y: head.y + velocity.y
			};
			if (newHead.x < 0 || newHead.y < 0 || newHead.x > 19 || newHead.y > 14) {
				lose();
			}
			for (let i = 0; i < worm.length; i++) {
				if (worm[i].x === newHead.x && worm[i].y === newHead.y) {
					lose();
				}
			}
			worm.unshift(newHead);
			if (worm.length > targetLength) {
				worm.pop();
			}
		}

		/** This function is what will happen after the user lose
		 * It will alert the user their score and rewind the game to original state
		 * and give users option to play again
		 */
		function lose() {
			alert("You lost! Your score was " + getSumScore());
			isGamerunning = false;
			$("start").innerText = "New Game";
			$("start").classList.remove("hidden");
			ctx.clearRect(0, 0, 800, 600);
			let q = qsa(".speed-option");
			for (let i = 0; i < q.length; i++) {
				q[i].classList.remove("hidden");
			}
		}

		/** This function will check if the apple was eaten by the worm
		 *  if it was then it will reassign the position for new apple
		 *  and also check to make sure that the new apple will not colide
		 *  with the worm body
		 */
		function maybeEatApple() {
			if (apple.x === worm[0].x && apple.y === worm[0].y) {
				targetLength++;
				if (score[5] < 9) {
					score[5]++;
				} else if (score[5] === 9) {
					score[5] = 0;
					score[4]++;
				} else if (score[4] === 9) {
					score[4] = 0;
					score[3]++;
				} else if (score[3] === 9) {
					score[3] = 0;
					score[2]++;
				} else if (score[2] === 9) {
					score[2] = 0;
					score[1]++;
				} else if (score[1] === 9) {
					score[1] = 0;
					score[0]++;
				} else {
					score = [0, 0, 0, 0, 0, 0];
				}
				let x = Math.floor(Math.random() * 20);
				let y = Math.floor(Math.random() * 15);
				let check = false;
				do {
					for (let i = 0; i < worm.length; i++) {
						if (x === worm[i].x && y === worm[i].y) {
							check = true;
						}
					}
					if (check) {
						x = Math.floor(Math.random() * 20);
						y = Math.floor(Math.random() * 15);
					}
				} while (check);
				apple.x = x;
				apple.y = y;
			}
		}

		/** This function will update the state of the Game
		 * by moving the worm and check if apple was eaten
		 * and update the score
		 */
		function update() {
			if (isGamerunning) {
				moveworm();
				maybeEatApple();
				$("score").innerText =
					"Score: " + score[0] + score[1] + score[2] + score[3] + score[4] + score[5];
			}
		}

		/** This function will draw a colorful worm on canvas
		 *  with appropiate position
		 */
		function drawworm() {
			ctx.clearRect(0, 0, 800, 600);
			ctx.fillStyle = "green";
			for (let i = 0; i < worm.length; i++) {
				ctx.fillRect(worm[i].x * 15, worm[i].y * 10, 15, 10);
			}
		}

		/** This function will draw red apple on canvas
		 *  with appropiate position
		 */
		function drawApple() {
			ctx.fillStyle = "red";
			ctx.fillRect(apple.x * 15, apple.y * 10, 15, 10);
		}

		/** This function will manage the screen directly
		 *  by updating and always checking the state of the game
		 *  to see if drawing need to be done on the canvas or not
		 */
		function frame() {
			update();
			if (isGamerunning) {
				drawworm();
				drawApple();
			}
		}

		/** This function corresponse to user input by pressing arrow keys
		 *  It will re-assigning the velocity to be appropiate to the input
     *  @param {Everything} e - in this case e stand for every keys
     *  will only trigger for some key pressed
		 */
		function onKeyDown(e) {
			switch (e.keyCode) {
				case 37:
					if (velocity.x != 1) {
						velocity = {
							x: -1,
							y: 0
						};
					}
          break;
				case 38:
					if (velocity.y != 1) {
						velocity = {
							x: 0,
							y: -1
						};
					}
          break;
				case 39:
					if (velocity.x != -1) {
						velocity = {
							x: 1,
							y: 0
						};
					}
          break;
				case 40:
					if (velocity.y != -1) {
						velocity = {
							x: 0,
							y: 1
						};
					}
          break;
			}
		}

		/** This function will generate a random number within the range
		 *  of indexes of array of color and
     *  @return {String} - of that index of color[]
		 */
		function getRandomColor() {
			let x = Math.floor(Math.random() * Math.floor(7));
			return color[x];
		}
		window.addEventListener("keydown", onKeyDown);
		setInterval(frame, 1000 / speed);
	}

	/** This is a helper method to reduce the typing time for getting
	 *  the access to ElementId by accepting
   *  @param {String} id - the id of element we're trying to access
   *  @returns {ElementId} of given id
	 */
	function $(id) {
		return document.getElementById(id);
	}

	/** This is a helper method to reduce the typing time for getting
	 *  the access to the first element of the tag/class given by accepting
	 *  @param {String} tag - the class/tag of element we're trying to access
   *  @returns {querySelector} of given class/tag
	 */
	function qs(tag) {
		return document.querySelector(tag);
	}

	/** This is a helper method to reduce the typing time for getting
	 *  the access to all elements in the tag/class given by accepting
	 *  @param {String} tag - the class/tag of elements we want to look at
   *  @returns  {querySelectorAll} - array of every element inside the tag/class
	 */
	function qsa(tag) {
		return document.querySelectorAll(tag);
	}
})();
