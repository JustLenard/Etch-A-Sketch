let columnsValue = document.querySelector('.width-value').value;
currentColor = '#000';
var boxes;

const playingField = document.querySelector('.playing-field');
const reset = document.querySelector('.reset-btn');
const penColor = document.querySelector('#pen-color');
const pen = document.querySelector('.pen');
const rainbow = document.querySelector('.rainbow');
const fill = document.querySelector('.fill');
const shadder = document.querySelector('.shadder');
const columnsArea = document.querySelector('.width-value');

//Creates the initial board.
createBoxes(columnsValue);
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

// Listens and recreates the 'playingField' based on the desired size.
[columnsArea].forEach(area =>
	area.addEventListener('change', () => {
		columnsValue = columnsArea.value;
		playingField.innerHTML = '';
		createBoxes(columnsValue);
		painting();
	})
);

// Creates 'boxes' in the 'playingField'.
function createBoxes(columns) {
	for (let i = 1; i <= columns ** 2; i++) {
		playingField.insertAdjacentHTML('beforeend', `<div class="box"></div>`);
	}
	const boxWidth = 100 / columnsValue;
	boxes = document.querySelectorAll('.box');

	boxes.forEach(box => {
		box.style.width = `${boxWidth}%`;
		box.style.height = `${boxWidth}%`;
	});
}

// All the painting logic.
function painting() {
	console.log('f');
	boxes.forEach(box => {
		box.addEventListener('mouseover', () => {
			if (pen.classList.contains('active')) {
				box.style.backgroundColor = `${currentColor}`;
			} else if (rainbow.classList.contains('active')) {
				box.style.backgroundColor = `rgb(${rn()},${rn()},${rn()})`;
			} else if (fill.classList.contains('active')) {
				boxes.forEach(box => {
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
	boxes.forEach(box => {
		box.style.filter = null;
		box.style.backgroundColor = null;
	});
});

// Random number generator for the rgb in 'rainbow'.
function rn() {
	return Math.floor(Math.random() * 256 + 1);
}
