var Program = function (width, height, init, outputElement) {
	this.width = width || 50
	this.height = height || 50
	this.outputElement = outputElement
	this.generation = 0
	this.velocity = 1000
	this.timeouts = []
	this.startWith = init
	this.compare1 = 0
	this.compare2 = 1

	this.generateMatrix()
}

Program.prototype.nextTick = function () {
	var self = this

	this.generation += 1

	var newArray = this.data
	var self = this
	var y
	var x
	var yTotal = this.height
	var xTotal = this.width

	this.data.forEach(function (row, y) {
		for (x = 0; x < xTotal; x++) {
			newArray[y][x + 1] = (newArray[y][x - self.compare1] === newArray[y][x - self.compare2])? 1 : 0
		}
	})

	this.data = newArray
}

Program.prototype.render = function () {
	this.outputElement.innerHTML = ''

	var fragment = document.createDocumentFragment()

	this.data.forEach(function (yValue, yIndex) {
		var line = document.createElement('div')
		line.classList.add('row')

		yValue.forEach(function (xValue, xIndex) {
			var span = document.createElement('span')
			span.classList.add('row-item')
			span.classList.add('row-item-' + xValue)
			span.innerText = xValue
			line.appendChild(span)
		})

		fragment.appendChild(line)
	})

	this.outputElement.appendChild(fragment)
}

Program.prototype.play = function () {

	var self = this

	self.playing = 1

	var id = setTimeout(function () {
		self.renderNextTick()

		if (self.playing) {
			self.timeouts = []
			self.play()
		}
	}, self.velocity)

	self.timeouts.push(id)
}

Program.prototype.pause = function () {
	this.playing = 0

	this.timeouts.forEach(function (id) {
		clearTimeout(id)
	})
}


Program.prototype.renderNextTick = function () {
	this.nextTick();
	this.render()
}

Program.prototype.generateMatrix = function () {

	var array = []
	var self = this
	var y
	var x
	var yTotal = this.height
	var xTotal = this.width

	for (y = 0; y < yTotal; y++) {
		array[y] = []

		for (x = 0; x < xTotal; x++) {

			if (x === 0) {
				array[y][x] = y % 2
			} else {
				array[y][x + 1] = (!!array[y][x] === !!array[y][x - 1])? 1 : 0
			}
		}
	};

	this.data = array
}

var program = new Program(86, 50, 0, document.querySelector('.container'))
program.compare2 = 1
program.renderNextTick()


// Controles
document.addEventListener('input', function (event) {
	var output = document.querySelector('[for="' + event.target.id + '"]')

	if (output) {
		output.innerHTML = event.target.value
	}

	program[event.target.dataset.set] = parseInt(event.target.value)

	console.log(program[event.target.dataset.set])
})

// Controles
document.addEventListener('click', function (event) {
	var fun = program[event.target.dataset.action]

	if (typeof fun === 'function') {
		program[event.target.dataset.action]()
	}
})
