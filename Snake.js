// Variables
cells = 30;
cellSize = 20;

// Food
foodX = 20;
foodY = 20;

// Player position
playerX = 15;
playerY = 15;

// Move
moveX = 0;
moveY = 0;

// Trail moves, {x: ?, y: ?}
trail = [];
// хвост
tail = 3;

scoreBlock = document.querySelector("h2 span");

window.onload = function () {
	canv = document.querySelector("#canv");
	ctx = canv.getContext("2d");

	start();
}

function start() {

	// Player position
	playerX = 15;
	playerY = 15;

	// Move
	moveX = 0;
	moveY = 0;

	scoreBlock.innerText = 0;
	
	//  Start background
	let background = new Image();
	background.src = "start.png";
	background.onload = function () {
		ctx.drawImage(background, 0, 0);
		ctx.fillStyle = "black";
		ctx.font = "50px monospace";
		ctx.textAlign = "center";
		ctx.fillText("Start", 300, 500);
	}

	canv.onclick = function () {
		document.addEventListener("keydown", move);
		gameTimer = setInterval(game, 60);
		canv.onclick = null;
	}
}

function game() {
	playerX += moveX;
	playerY += moveY;

	if (playerX < 0 || playerY < 0 || playerY > cells || playerX > cells) {
		endGame();
	}

	ctx.fillStyle = "#422857";
	ctx.fillRect(0, 0, canv.width, canv.height);

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);

	ctx.fillStyle = "#fe3c70";
	for (let i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * cellSize, trail[i].y * cellSize, cellSize, cellSize);
		if (playerX == trail[i].x && playerY == trail[i].y) {
			tail = 3;
			scoreBlock.innerText = 0;
		}
	}

	trail.push({
		x: playerX,
		y: playerY
	});

	if (playerX == foodX && playerY == foodY) {
		tail++;
		scoreBlock.innerText = +scoreBlock.innerText + 1;
		foodX = Math.floor(Math.random() * cells);
		foodY = Math.floor(Math.random() * cells);
	}

	while (trail.length > tail) {
		trail.shift();
	}
}
// Game over
function endGame() {
	clearInterval(gameTimer);
	setTimeout(function () {
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "center";
		ctx.font = "50px monospace";
		ctx.fillText("End Game!", 300, 300);
	}, 100)

	canv.onclick = start;
}
function move(e) {
	switch (e.keyCode) {
		case 37:
			moveX = -1;
			moveY = 0;
			break;
		case 38:
			moveX = 0;
			moveY = -1;
			break;
		case 39:
			moveX = 1;
			moveY = 0;
			break;
		case 40:
			moveX = 0;
			moveY = 1;
			break;
	}
}