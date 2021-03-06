
////// Media Queries ////////

//this media query is used for setting the board size and use of the collapse navbar
//Idea for using media query this way came from stackoverflow: https://stackoverflow.com/questions/31511001/is-there-a-javascript-equivalent-to-using-media-query
function setSquareSizeMQ() {
    const mqMediumMobile = window.matchMedia( "(max-width: 425px)" );
    
    if (mqMediumMobile.matches) {
        //If the hamburger menu is availible it will toggle so it closes when a page is selected
        var startButton = document.getElementById('menu_start_btn');
        var rulesButton = document.getElementById('menu_rules_btn');
        startButton.setAttribute("onclick", "openMenu(); toggleNav()");
        rulesButton.setAttribute("onclick", "openRules(); toggleNav();");
    } 

    if (mqMediumMobile.matches && size == 10) {
        squareSize = 32;
    } else if(mqMediumMobile.matches && size == 8) {
        squareSize = 38;
    } else if (mqMediumMobile.matches) {
        squareSize = 45;
    } else {
        setSquareSize();
    }
}

function setSquareSize() { //decides the size of each square depending on how large the player wants 
    size == 10 ? squareSize = 45 : squareSize = 55;
}

//Creates the squares that will make up the board. Using canvas to be able 
//to draw the discs on the board. Giving each square an individual id with X and Y value
//to determine it's position.  
function makeSquare(x, y) {
    var square = document.createElement('canvas');
    square.setAttribute('class', 'squares');
    square.setAttribute('id', `position`+ '_'+ x.toString() +'_'+ y.toString());
    board.appendChild(square);
    
    //setting the default size of the canvas to be able to draw circles (discs) on it later
    square.width = 100; 
    square.height = 100;
    
    setSquareSizeMQ();
    centerBoard();
    
    //styling attributes on squares
    square.style.left = (x * squareSize) + 'px';
    square.style.top = (y * squareSize) + 'px';
    square.style.height = squareSize + 'px';
    square.style.width = squareSize + 'px';
    
    //giving the square an event handler and calling the play function with the 
    //coresponding x and y values of the clicked square ID
    square.setAttribute('onclick', 'play('+x+', '+y+', currentPlayer)');
}

//2 dimensional for loop drawing a board, size is choosed by the user.
// ".board" is the div the board gets drawn in. first line clears it.
function drawBoard(size) {
    board.innerHTML = "";
    for(x = 0; x < size; x++) {
        for(y = 0; y < size; y++) {
            makeSquare(x, y);
            
            if ((x + y) % 2 == 0) { //making every second square a darker color
                document.getElementById(`position`+ '_'+ x.toString() +'_'+ y.toString()).style.backgroundColor = '#056535';
            }
        }
    }
}

//Function to draw the discs. they take 3 parameters, the squares x and y value, and the color
//of the players disc.
//Idea for creating discs on canvas and code came from w3schools article: 
// https://www.w3schools.com/tags/canvas_arc.asp
function drawDisc(x, y, player) {
    var square = document.getElementById(`position`+ '_'+ x.toString() +'_'+ y.toString());
    var ctx = square.getContext("2d");
    ctx.clearRect(0, 0, square.width, square.height); //clears the canvas before being draws upon
    //draw a circle on the canvas
    ctx.beginPath();
    ctx.arc(50,50,45,0*Math.PI,2*Math.PI); 
        if (player == 0) {
            return;
        } else if (player == playerWhite) { //decide which color to draw depending on players team
            ctx.fillStyle = "#fff";
        } else if(player == playerBlack) {
            ctx.fillStyle ="#000";
        }
        ctx.fill();
    }

//Center the board solution. This centeres the board on different screen sizes.  
function centerBoard() {
    var boardWidth = (squareSize * size) + 'px';
    var centerString = "calc((100% - "+ boardWidth +")/2)";
    
    board.style.left = centerString;
    board.style.right = centerString;
}

function displayScore(white, black) {
    //elements for desktop view
    document.getElementById('white-score-desktop').innerHTML = white;
    document.getElementById('black-score-desktop').innerHTML = black;
    
    //elements for mobile view
    document.getElementById('white-score-mobile').innerHTML = white;
    document.getElementById('black-score-mobile').innerHTML = black;
}

function displayCurrentPlayer(currentP) {
    if (currentP == 1) {
        document.getElementById('current-player').innerHTML = "White's Turn";
        document.getElementById('current-player-mobile').innerHTML = "White's Turn";
    } else {
    document.getElementById('current-player').innerHTML = "Black's Turn";
    document.getElementById('current-player-mobile').innerHTML = "Black's Turn";
    }
}

////// Section for pop-up message ////////

function gameOverMessage(w, b) {
    var finalScoreBlack = document.getElementById('final_black_score');
    var finalScoreWhite = document.getElementById('final_white_score');
    var gameOverPopUp = document.getElementById('game_over');
    
    gameOverPopUp.style.display = "block";
    
    finalScoreBlack.innerHTML = b;
    finalScoreWhite.innerHTML = w;
}

function switchPlayerMessage() {
    document.getElementById('switch_player').style.display = "block";
}