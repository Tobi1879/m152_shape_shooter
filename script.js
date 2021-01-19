window.onload = init();

function init() {
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("gameboard");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext('2d');

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
    });
}

function startGame() {

}