var canvas;
var ctx;

window.onload = init();

function init() {
    /** @type {HTMLCanvasElement} */
    canvas = document.getElementById("gameboard");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    // Start Button
    ctx.fillStyle = '#8064A2';
    // zentriertes Rechteck
    ctx.fillRect(canvas.width / 4, 3 * canvas.height / 8, canvas.width / 2, canvas.height / 4);
    // Start Text
    ctx.fillStyle = "rgb(68, 68, 65)";
    ctx.font = 'bold 50px Arial, Helvetica, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText('Start', canvas.width / 2, canvas.height / 2 + 12.5);

    // Start Button Action
    canvas.addEventListener('click', event => {
        let x = event.clientX;
        let y = event.clientY;

        //alert("x: " + x + " y: " + y + "canvas.width: " + canvas.width + "canvas.height: " + canvas.height);
        //alert("if (x >= " + canvas.width / 4 + "&& x <= " + 3 * canvas.width / 4 + "&& y >=" + 3 * canvas.height / 8 + "&& y <= " + 5 * canvas.height / 8 + ")")

        // checken ob der Click auf dem Start Button gemacht (rect)
        if ((x >= canvas.width / 4) && (x <= 3 * canvas.width / 4) && (y >= 3 * canvas.height / 8) && (y <= 5 * canvas.height / 8)) {
            startGame();
        }
    }, { once: true });
}

function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let countdown = 45;

    // Punkte Text
    ctx.fillStyle = "#f00";
    ctx.font = 'bold 50px Arial, Helvetica, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText('Points: 0', 50, 50);

    // Titel Text
    ctx.fillStyle = "#f00";
    ctx.font = 'bold 50px Arial, Helvetica, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText('Shape Shooter', canvas.width / 2, 50);

    // Countdown Text
    ctx.fillStyle = "#f00";
    ctx.font = 'bold 50px Arial, Helvetica, sans-serif';
    ctx.textAlign = "right";

    var x = setInterval(function() {
        // Achtung Spielfeld 9/10 vom Screen
        ctx.clearRect(canvas.width * 3 / 4, 0, canvas.width / 4, canvas.width / 10);
        ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);
        countdown--;
        if (countdown == 0) {
            ctx.clearRect(canvas.width * 3 / 4, 0, canvas.width / 4, canvas.width / 10);
            ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);
            clearInterval(x);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    // todo
    alert("start click")

}

function shapeShooter() {

}

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    //Because of the moving
    this.dx;
    this.dy;

    this.drawn = function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.Pi * 2);
        ctx.fill();
    }
}

function Rect() {

}