var Program = function (width, height, init, outputElement) {
	this.width = width || 50
	this.height = height || 50
	this.outputElement = outputElement
	this.generation = 0
	this.velocity = 1000
	this.timeouts = []
	this.startWith = init
	this.compare1 = 4
	this.compare2 = 2
	this.data = []

	this.generateMatrix()
}

Program.prototype.nextTick = function () {
	var self = this

	this.generation += 1

	var self = this
	var array = []
	var y
	var x
	var yTotal = this.height
	var xTotal = this.width
	var total = self.height * self.width
	var i = 0
	var currentHeight = 0

	for (i; i < total; i++) {
		if ((i % self.width) !== 0 && i !== 0) {
			array[currentHeight].push((i % self.compare1) % self.compare1)
		} else if ((i % self.width === 0)) {
			currentHeight += 1
			array[currentHeight] = []
			array[currentHeight].push((i % self.compare1) % self.compare2)
		}
	};

	this.data = array
}

Program.prototype.render = function () {
	this.outputElement.innerHTML = ''

	var fragment = document.createDocumentFragment()

	var self = this

	this.data.forEach(function (yValue, yIndex) {
		var line = document.createElement('div')
		line.classList.add('row')

		yValue.forEach(function (xValue, xIndex) {
			var r = (yIndex + 1) * (xIndex + 1)
			var g = r % self.compare1 % self.compare2 * r
			var b = r % self.compare1 % self.compare2 * r

			var span = document.createElement('span')
			span.classList.add('row-item')
			span.classList.add('row-item-' + xValue)
			span.style.background = 'rgb('+r+', '+g+', '+b+')';
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

	var self = this
	var array = []
	var y
	var x
	var yTotal = this.height
	var xTotal = this.width
	var total = self.height * self.width
	var i = 0
	var currentHeight = 0

	for (i; i < total; i++) {
		if ((i % self.width) !== 0 && i !== 0) {
			array[currentHeight].push((i % self.compare1) % self.compare1)

			// console.log(currentHeight, i, array[currentHeight][i % self.width])

			// console.log('Adiciona item', currentHeight, i, (i % 3) % 2)
		} else if ((i % self.width === 0)) {
			currentHeight += 1
			array[currentHeight] = []
			array[currentHeight].push((i % self.compare1) % self.compare2)

			// console.log(i, array[currentHeight][i % self.width])
			// console.log('Add row', currentHeight, i, )
		}
	};

	this.data = array
}

var program = new Program(10, 10, 1, document.querySelector('.container'))
program.compare2 = 1
program.render()

program.velocity = 500
program.play()


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
10
