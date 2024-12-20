const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
let currentShooterIndex = 202
const width = 15
let direction = 1
let invaderId
let goingRight = true
let alienRemove = []
let result = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const aliensinvader = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {
  for (let i = 0; i < aliensinvader.length; i++) {
    if (!alienRemove.includes(i)){
      squares[aliensinvader[i]].classList.add('invader')
    }
  }
}
draw()

function remove() {
  for (let i = 0; i < aliensinvader.length; i++) {
    squares[aliensinvader[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter (e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key){
    case 'ArrowLeft':
      if(currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight':
      if(currentShooterIndex % width < width - 1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keyup', moveShooter)

function moveInvader () {
  const leftEdge = aliensinvader[0] % width === 0
  const rightEdge = aliensinvader[aliensinvader.length - 1] % width === width -1
  remove()

  if(rightEdge && goingRight){
    for(let i = 0;i < aliensinvader.length; i++){
      aliensinvader[i] += width + 1
      direction = -1
      goingRight = false
    }
  }
  if(leftEdge && !goingRight){
    for(let i = 0;i < aliensinvader.length; i++){
      aliensinvader[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for(let i = 0; i < aliensinvader.length; i++){
    aliensinvader[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')){
    resultDisplay.innerHTML = 'GAME OVER'
    clearInterval(invaderId)
  }

  for( let i = 0; i < aliensinvader.length; i++){
    if (aliensinvader[i] > (squares.length)){
      resultDisplay.innerHTML = 'GAME OVER'
      clearInterval(invaderId)
    }
  }
  if(alienRemove.length === aliensinvader.length){
    resultDisplay.innerHTML= "YOU WIN"
    clearInterval(invaderId)
  }
} 

invaderId = setInterval(moveInvader, 500)

function shoot (e) {
  let laserId
  let CurrentLaserIndex = currentShooterIndex
  function moveLaser () {
    squares[CurrentLaserIndex].classList.remove('laser')
    CurrentLaserIndex -= width
    squares[CurrentLaserIndex].classList.add('laser')
    if (squares[CurrentLaserIndex].classList.contains('invader')){
      squares[CurrentLaserIndex].classList.remove('invader')
      squares[CurrentLaserIndex].classList.remove('laser')
      squares[CurrentLaserIndex].classList.add('boom')

      setTimeout(() => squares[CurrentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoval = aliensinvader.indexOf(CurrentLaserIndex)
      alienRemove.push(alienRemoval)
      result++
      resultDisplay.innerHTML = result
    }

  }
  switch(e.key){
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)