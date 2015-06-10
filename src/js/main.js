var Program = function (width, height, init, canvas) {
	this.width = width
	this.height = height
	this.generation = 0
	this.velocity = 1000
	this.timeouts = []
	this.startWith = init
	this.compare1 = 0
	this.compare2 = 1

	this.canvas = canvas
	this.context = canvas.getContext('2d')

	this.canvas.width = this.width
	this.canvas.height = this.height

	this.imageData = this.context.getImageData(this.canvas.width, this.canvas.height, 500, 500)
	this.length = this.imageData.data.length
	this.data = this.imageData.data

	this.nextTick()
}

Program.prototype.nextTick = function () {
	console.log('nextTick')
	for (var i = 0; i < this.length; i += 4) {
		/*
			Lógica

			-: data[i + 1] = 0;
			+: data[i + 1] = 1;

			data[i] = 1; === data[i] = 1; = +
			data[i] = 0; === data[i] = 0; = +
			data[i] = 0; === data[i] = 1; = -
			data[i] = 1; === data[i] = 0; = -
		*/

	  if (this.data[i - this.compare1] == this.data[i - this.compare2]) {
	  	this.data[i + (0)] = 1
	  } else {
	  	this.data[i + (0)] = 0
	  }

	  if (this.data[i]) {
			this.data[i + 1] = 250;
		  this.data[i + 2] = 0;
		  this.data[i + 3] = 250;
	  } else {
	  	this.data[i + 1] = 0;
		  this.data[i + 2] = 250;
		  this.data[i + 3] = 250;
	  }
	}

	this.context.putImageData(this.imageData, 0, 0)
}

Program.prototype.play = function () {
	console.log('play')

	var self = this

	self.playing = 1

	var id = setTimeout(function () {
		self.nextTick()

		if (self.playing) {
			self.timeouts = []
			self.play()
		}
	}, self.velocity)

	self.timeouts.push(id)
}

Program.prototype.pause = function () {
	console.log('pause')
	this.playing = 0

	this.timeouts.forEach(function (id) {
		clearTimeout(id)
	})
}

// Init program
var program = new Program(500, 500, 0, document.querySelector('#canvas'))
program.compare2 = 4
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


