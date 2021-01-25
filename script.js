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
    const form1 = [];
    let r = Math.floor(Math.random() * 30) + 15;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let c = rgb(68, 68, 65);
    form1.push(new Circle(x, y, r, c));
}

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    //Gibt Richtung
    this.dx = (Math.random() * 4) + 1;
    //Da man mehrere Richtungen will
    this.dx = Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.dy = (Math.random() * 4) + 1;
    this.dy = Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.drawn = function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.Pi * 2);
        ctx.fill();
    }

    this.animate = function() {
        this.x += this.dx;
        this.y += this.dy;

        //Damit sie von den Wänden abprallen
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.drawn();
    }
}



function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < form1.length; i++) {
        form1[i].animate();
    }

    requestAnimationFrame(Update);
}
Update();

function Rect() {

}