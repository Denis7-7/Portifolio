let canvas = document.getElementById("quadro"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;

function criarFundo(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
} //seta sua posição inicial, define o array.
function criarCobra(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "red";
        context.fillRect(snake[i].x, snake[i].y, box, box);//funcionamento da cobra
    }
}
let food ={//define o funcionamento do array, além de defini-lo
   x:Math.floor(Math.random()* 15 * 1) * box,
   y:Math.floor(Math.random() *15 * 1) * box
}
function criarComida(){// o preeche
    context.fillStyle = "gray";
    context.fillRect(food.x, food.y, box, box);
}
let direction = "";// pode definir a direção inicial, mas prefiro que o jogador decida
function movimento(event){// define movimentos
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

document.addEventListener('keydown', movimento);//define evento
function rodar(){

    if(snake[0].x > 15*box && direction != "left") snake[0].x = 0;// define o que acontece quando se chega à qualquer uma das bordas
    if(snake[0].x < 0 && direction != "right") snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction != "up") snake[0].y = 0;
    if(snake[0].y < 0 && direction != "down") snake[0].y = 16 * box;

    criarFundo();
    criarCobra();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    for(i = 1; i < snake.length; i++){//define evento de game over
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    if(direction == "right") snakeX += box;//funcionamento dos movimento
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){//evento de comer a comida
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}
let jogo = setInterval(rodar, 100);
