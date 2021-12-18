let columnsValue = document.querySelector('.width-value').value;
currentColor = '#000';
var pixels;

const canvas = document.querySelector('.playing-field');
const reset = document.querySelector('.reset-btn');
const penColor = document.querySelector('#pen-color');
const pen = document.querySelector('.pen');
const rainbow = document.querySelector('.rainbow');
const fill = document.querySelector('.fill');
const shadder = document.querySelector('.shadder');
const columnsArea = document.querySelector('.width-value');

//Creates the initial board.
createPixels(columnsValue);
painting();

// Handles pen color change.
penColor.onchange = e => setPenColor(e.target.value);
function setPenColor(newColor) {
	currentColor = newColor;
}

// 'Tool' selection.
[pen, rainbow, fill, shadder].forEach(tool =>
	tool.addEventListener('click', () => {
		[pen, rainbow, fill, shadder].forEach(tool => {
			tool.classList.remove('active');
		});
		tool.classList.add('active');
	})
);

// Listens and recreates the 'canvas' with the desired amount of 'pixels'
columnsArea.addEventListener('change', () => {
	columnsValue = columnsArea.value;
	canvas.innerHTML = '';
	createPixels(columnsValue);
	painting();
});

// Creates the 'pixels' in the 'canvas'.
function createPixels(columns) {
	for (let i = 1; i <= columns ** 2; i++) {
		canvas.insertAdjacentHTML('beforeend', `<div class="box"></div>`);
	}
	const pixelWidth = 100 / columnsValue;
	pixels = document.querySelectorAll('.box');

	pixels.forEach(pixel => {
		pixel.style.width = `${pixelWidth}%`;
		pixel.style.height = `${pixelWidth}%`;
	});
}

// All the painting logic.
function painting() {
	pixels.forEach(box => {
		box.addEventListener('mouseover', () => {
			if (pen.classList.contains('active')) {
				box.style.backgroundColor = `${currentColor}`;
			} else if (rainbow.classList.contains('active')) {
				box.style.backgroundColor = `rgb(${rn()},${rn()},${rn()})`;
			} else if (fill.classList.contains('active')) {
				pixels.forEach(box => {
					box.style.backgroundColor = `${currentColor}`;
					box.style.filter = null;
				});
			} else if (shadder.classList.contains('active')) {
				style = window.getComputedStyle(box);
				br = style.getPropertyValue('filter').match(/[0-9 , \.]+/g);
				if (br === null && box.style.backgroundColor !== '') {
					box.style.filter = 'brightness(0.9)';
				} else if (br !== null) {
					box.style.filter = `brightness(${br.join() - 0.1})`;
				}
			}
		});
	});
}

// Reset button logic.
reset.addEventListener('click', () => {
	pixels.forEach(box => {
		box.style.filter = null;
		box.style.backgroundColor = null;
	});
});

// Random number generator for the rgb in 'rainbow'.
function rn() {
	return Math.floor(Math.random() * 256 + 1);
}

//Think of some better names to use for variables.
