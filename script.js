const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let snake = [
	{x: 200, y: 200},
	{x: 190, y: 200},
	{x: 180, y: 200}
];

let direction = 'right';
let food = {x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20};
let score = 0;

function drawSnake() {
	snake.forEach(segment => {
		ctx.fillStyle = 'green';
		ctx.fillRect(segment.x, segment.y, 20, 20);
	});
}

function drawFood() {
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, 20, 20);
}
function update() {
	const head = snake[0];
	let newHead = {x: head.x, y: head.y};

	if (direction === 'right') {
		newHead.x += 20;
	} else if (direction === 'left') {
		newHead.x -= 20;
	} else if (direction === 'up') {
		newHead.y -= 20;
	} else if (direction === 'down') {
		newHead.y += 20;
	}

	snake.unshift(newHead);

	if (newHead.x === food.x && newHead.y === food.y) {
		score++;
		food = {x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20};
	} else {
		snake.pop();
	}

	if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
		alert('Game Over!');
	}
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	drawFood();
	scoreDisplay.textContent = `Score: ${score}`;
}

document.addEventListener('keydown', event => {
	if (event.key === 'ArrowUp' && direction !== 'down') {
		direction = 'up';
	} else if (event.key === 'ArrowDown' && direction !== 'up') {
		direction = 'down';
	} else if (event.key === 'ArrowLeft' && direction !== 'right') {
		direction = 'left';
	} else if (event.key === 'ArrowRight' && direction !== 'left') {
		direction = 'right';
	}
});

setInterval(() => {
	update();
	render();
}, 100);
