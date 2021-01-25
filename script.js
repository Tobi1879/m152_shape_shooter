var canvas;
var ctx;
var rect = new Rect(1, 1, 1, 1, 'red');
var circle = new Circle(100, 75, 50, 0, 1.5 * Math.PI);
var points = 0;

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
    ctx.fillText('Points: ' + points, 50, 50);

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
        ctx.clearRect(canvas.width * 3 / 4, 0, canvas.width / 4, canvas.height / 10);
        ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);
        countdown--;
        if (countdown == 0) {
            ctx.clearRect(canvas.width * 3 / 4, 0, canvas.width / 4, canvas.width / 10);
            ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);
            clearInterval(x);
            gameOver();
        }
    }, 1000);


    newRect();
    newCircle();
    Update();
}

function gameOver() {
    // todo
}

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    //Gibt Richtung
    this.dx = Math.random() * 4 + 1;
    //Da man mehrere Richtungen will
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.dy = (Math.random() * 4) + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        //ctx.arc(this.x, this.y, this.r, 0, Math.Pi * 2);
        ctx.arc(100, 100, 20, 0, Math.Pi * 2);
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

        this.draw();
    }
}

this.newCircle = function() {
    let r = Math.floor(Math.random() * 30) + 100;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (9 * canvas.height / 10 - r * 2) + r + canvas.width / 10;
    let c = 'red';
    this.circle = new Circle(x, y, r, c);
}

function Rect(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.dx = Math.random() * 4 + 1;
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.dy = Math.random() * 4 + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(this.x, this.y, this.height, this.width);
        ctx.fill();
    }

    this.animate = function() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.width > canvas.width || this.x < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.height > canvas.height || this.y < canvas.height / 10) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

this.newRect = function() {
    let height = Math.floor(Math.random() * 30) + 100;
    let width = Math.floor(Math.random() * 30) + 100;
    let x = Math.random() * (canvas.width - width * 2) + width;
    let y = Math.random() * (9 * canvas.height / 10 - height * 2) + height + canvas.width / 10;
    let color = 'red';
    this.rect = new Rect(x, y, width, height, color);
}

canvas.addEventListener('click', function(e) {
    if (e.clientX > rect.x && e.clientX < rect.x + rect.width && e.clientY > rect.y && e.clientY < rect.y + rect.height) {
        //remove rect
        rect = null;
        //new Rect
        newRect();
        //Points
        points += 50;
        // remove Ponints Text
        ctx.clearRect(0, 0, canvas.width / 3, canvas.height / 10);
        // Punkte Text
        ctx.fillStyle = "#f00";
        ctx.font = 'bold 50px Arial, Helvetica, sans-serif';
        ctx.textAlign = "left";
        ctx.fillText('Points: ' + points, 50, 50);
    }
})

function Update() {
    ctx.clearRect(0, canvas.height / 10, canvas.width, canvas.height * 9 / 10);
    rect.animate();
    circle.animate();
    console.log(circle.x + ", " + circle.y + ", " + circle.r);

    requestAnimationFrame(Update);
}