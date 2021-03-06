/*
Modul 152, Leistungsbeurteilung
26.01.2021, Tobias Locher & Philipp Rüegg
*/

// global variables
var canvas;
var ctx;
// Example data for the shapes
var rect = new Rect(1, 1, 1, 1, 'red');
var circle = new Circle(100, 75, ' + 0.0325 * canvas.width + ', 'red');
var triangle = new Triangle(1, 1, 1, 1, 'red');
var points = 0;
var resultPoints;
var updateAnimationFrame;
var startClicked = false;
var isGameOverScreen = false;

window.onload = init();

function init() {
    /** @type {HTMLCanvasElement} */
    canvas = document.getElementById("gameboard");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    // create logo
    logo();

    // Start button
    ctx.fillStyle = "rgb(192,80,77)";
    // centered rect
    ctx.fillRect(canvas.width / 4, 3 * canvas.height / 8, canvas.width / 2, canvas.height / 4);
    // Start text
    ctx.fillStyle = "rgb(68, 68, 65)";
    changeFonts(1)
    ctx.textAlign = "center";
    ctx.fillText('Start', canvas.width / 2, canvas.height / 2 + 12.5);

    // Start Button Action
    canvas.addEventListener('click', event => {
        let x = event.clientX;
        let y = event.clientY;

        // check if click on rect
        if ((x >= canvas.width / 4) && (x <= 3 * canvas.width / 4) && (y >= 3 * canvas.height / 8) && (y <= 5 * canvas.height / 8) && startClicked == false) {
            startClicked = true;
            startGame();
        }
    });
}

/**
 * Starts the game
 */
function startGame() {
    changeFonts(1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let countdown = 45;

    // Points text
    ctx.fillStyle = "rgb(192,80,77)";
    ctx.textAlign = "left";
    ctx.fillText('Points: ' + points, 50, 50);

    // Titel text
    ctx.textAlign = "center";
    ctx.fillText('Shape Shooter', canvas.width / 2, 50);

    // Countdown text
    ctx.textAlign = "right";
    ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);

    // 1 second interval for countdown
    var x = setInterval(function() {
        ctx.clearRect(canvas.width * 3 / 4, 0, canvas.width / 4, canvas.height / 10);
        ctx.textAlign = "right";
        ctx.fillStyle = "rgb(192,80,77)";
        countdown--;
        ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);
        if (countdown == 0) {
            ctx.clearRect(canvas.width * 3 / 4, 0, canvas.width / 4, canvas.width / 10);
            ctx.fillText('Time: ' + countdown, canvas.width - 50, 50);
            gameOver();
            clearInterval(x);
        }
    }, 1000);

    // create first forms
    newTriangle();
    newCircle();
    newRect();

    // Update function for the animation
    Update();
}

/** like a class for the Triangles
 * 
 * @param {*} x1    x coordinate of point 1 of the triangle
 * @param {*} y1    y coordinate of point 1 of the triangle
 * @param {*} x2    x coordinate of point 2 of the triangle
 * @param {*} y2    y coordinate of point 2 of the triangle
 * @param {*} c     fill color
 */
function Triangle(x1, y1, x2, y2, c) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x1;
    this.y3 = y2;
    this.c = c;

    // direction
    this.dx = Math.random() * 4 + 1;
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.dy = (Math.random() * 4) + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.closePath();

        ctx.fillStyle = c;
        ctx.fill();
    }

    this.animate = function() {
        this.x1 += this.dx;
        this.y1 += this.dy;
        this.x2 += this.dx;
        this.y2 += this.dy;
        this.x3 += this.dx;
        this.y3 += this.dy;

        // bounce from the walls
        if (this.x1 > canvas.width || this.x1 < 0 || this.x2 > canvas.width || this.x2 < 0 || this.x3 > canvas.width || this.x3 < 0) {
            this.dx = -this.dx;
        }

        if (this.y1 > canvas.height || this.y1 < canvas.height / 10 || this.y2 > canvas.height || this.y2 < canvas.height / 10 || this.y3 > canvas.height || this.y3 < canvas.height / 10) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

this.newTriangle = function() {
    r = Math.floor(Math.random() * 30) + 100;
    let x1 = Math.random() * (canvas.width - r * 2) + r;
    let y1 = Math.random() * (9 * canvas.height / 10 - r * 2) + r + canvas.height / 10;
    theta = 0.5;
    x2 = x1 + r * Math.cos(theta);
    y2 = y1 + r * Math.sin(theta)
    triangle = new Triangle(x1, y1, x2, y2, 'rgb(155,187,89)');
}

/** like a class for the Circles
 * 
 * @param {*} x    x coordinate of middle point
 * @param {*} y    y coordinate of middle point
 * @param {*} r    radius of circle
 * @param {*} c    fill color
 */
function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    // direction
    this.dx = Math.random() * 4 + 1;
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.dy = (Math.random() * 4) + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();

    }

    this.animate = function() {
        this.x += this.dx;
        this.y += this.dy;

        // bounce from walls
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < canvas.height / 10) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

this.newCircle = function() {
    let r = Math.floor(Math.random() * 15) + 50;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (9 * canvas.height / 10 - r * 2) + r + canvas.height / 10;
    let c = 'rgb(128,100,162)';
    this.circle = new Circle(x, y, r, c);
}

/**
 * 
 * @param {*} x         x coordinate
 * @param {*} y         y coordinate
 * @param {*} width     width of rect
 * @param {*} height    width of rect
 * @param {*} color     fill colro
 */
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
    let height = Math.floor(Math.random() * 30) + 100; // 100 - 130
    let width = Math.floor(Math.random() * 30) + 100; // 100 - 130
    let x = Math.random() * (canvas.width - width * 2) + width;
    let y = Math.random() * (9 * canvas.height / 10 - height * 2) + height + canvas.height / 10;
    let color = '#4F81BD';
    this.rect = new Rect(x, y, width, height, color);
}

// click on forms
canvas.addEventListener('click', function(e) {
    if (e.clientX > rect.x && e.clientX < rect.x + rect.width && e.clientY > rect.y && e.clientY < rect.y + rect.height) {
        //remove rect
        rect = null;
        //new Rect
        newRect();
        //Points
        points += 5;
        // remove Ponints Text
        ctx.clearRect(0, 0, canvas.width / 3, canvas.height / 10);
        // Punkte Text
        ctx.fillStyle = "#f00";
        ctx.textAlign = "left";
        ctx.fillStyle = "rgb(192,80,77)";
        ctx.fillText('Points: ' + points, 50, 50);
    }

    const mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };

    // get pixel under cursor
    const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

    // create rgb color for that pixel
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    // find a circle with the same colour

    console.log(color + ", " + triangle.c);
    if (color === triangle.c) {
        //remove rect
        triangle = null;
        //new Rect
        newTriangle();
        //Points
        points += 15;
        // remove Ponints Text
        ctx.clearRect(0, 0, canvas.width / 3, canvas.height / 10);
        // Punkte Text
        ctx.fillStyle = "#f00";
        ctx.textAlign = "left";
        ctx.fillStyle = "rgb(192,80,77)";
        ctx.fillText('Points: ' + points, 50, 50);
    }

    if (color === circle.c) {
        //remove circle
        circle = null;
        //new circle
        newCircle();
        //Points
        points += 10;
        // remove Ponints Text
        ctx.clearRect(0, 0, canvas.width / 3, canvas.height / 10);
        // Punkte Text
        ctx.fillStyle = "#f00";
        ctx.textAlign = "left";
        ctx.fillStyle = "rgb(192,80,77)";
        ctx.fillText('Points: ' + points, 50, 50);

        // fade out points
        fadeOut("10", e.clientX, e.clientY, 255, 0, 0);
    }
})

/**
 * function for animations
 */
function Update() {
    ctx.clearRect(0, canvas.height / 10 - 10, canvas.width, canvas.height);
    circle.animate();
    rect.animate();
    triangle.animate();

    updateAnimationFrame = requestAnimationFrame(Update);
}

function gameOver() {
    window.cancelAnimationFrame(updateAnimationFrame);
    rect = null;
    circle = null;
    triangle = null;
    resultPoints = points;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    changeFonts(2);
    ctx.fillStyle = "rgb(192,80,77)";
    ctx.textAlign = "center";
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height * 2 / 5);
    ctx.fillText('Points: ' + resultPoints, canvas.width / 2, canvas.height * 3 / 5);
    changeFonts(3);
    // wait, so that the user doesn't click for restart accidently
    setTimeout(() => {
        ctx.fillText('Click to restart', canvas.width / 2, canvas.height * 4 / 5);
        isGameOverScreen = true;
    }, 1000)
}

canvas.addEventListener('click', event => {
    if (isGameOverScreen == true) {
        isGameOverScreen = false;
        points = 0;
        resultPoints = 0;
        startGame();
    }
});

function changeFonts(fontNumber) {
    switch (fontNumber) {
        case 1:
            {
                if (canvas.width > 1300) {
                    ctx.font = 'bold 50px Arial, Helvetica, sans-serif';
                } else if (canvas.width > 900) {
                    ctx.font = 'bold 40px Arial, Helvetica, sans-serif';
                } else if (canvas.width > 500) {
                    ctx.font = 'bold 30px Arial, Helvetica, sans-serif';
                } else {
                    ctx.font = 'bold 20px Arial, Helvetica, sans-serif';
                }
                break;
            }
        case 2:
            {
                if (canvas.width > 1300) {
                    ctx.font = 'bold 150px Arial, Helvetica, sans-serif';
                } else if (canvas.width > 900) {
                    ctx.font = 'bold 120px Arial, Helvetica, sans-serif';
                } else if (canvas.width > 500) {
                    ctx.font = 'bold 90px Arial, Helvetica, sans-serif';
                } else {
                    ctx.font = 'bold 60px Arial, Helvetica, sans-serif';
                }
                break;
            }
        case 3:
            {
                if (canvas.width > 1300) {
                    ctx.font = 'bold 75px Arial, Helvetica, sans-serif';
                } else if (canvas.width > 900) {
                    ctx.font = 'bold 60px Arial, Helvetica, sans-serif';
                } else if (canvas.width > 500) {
                    ctx.font = 'bold 45px Arial, Helvetica, sans-serif';
                } else {
                    ctx.font = 'bold 30px Arial, Helvetica, sans-serif';
                }
                break;
            }
    }
}

function logo() {
    ctx.beginPath();
    ctx.fillStyle = '#4F81BD';
    ctx.rect(44 / 54 * canvas.width, canvas.width * 2 / 54, canvas.width * 7 / 54, canvas.width * 5 / 54);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(128,100,162)';
    ctx.arc(47 / 54 * canvas.width, 8 / 54 * canvas.width, 4 / 54 * canvas.width, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(155,187,89)';
    ctx.moveTo(49.5 / 54 * canvas.width, 1 / 54 * canvas.width);
    ctx.lineTo(53 / 54 * canvas.width, 11 / 54 * canvas.width);
    ctx.lineTo(46 / 54 * canvas.width, 11 / 54 * canvas.width);
    ctx.fill();

}