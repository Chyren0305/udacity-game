/*
  userChoice for expansion things those need.  
  renderPaint for draw those objects display or not.
  if we don't have nothing show up for canvas maybe caubse we forgot lost put source on the engine.js. 
*/
var userChoice = false;
var renderPaint = false;
var roleName = [
    'Ryan',
    'Joanne',
    'Cathy',
    'Karl'
];
var roleInfo = [
    "I am the king of world!!!(✪ω✪)",
    "I am Joanne!Hello! Go!(*˘︶˘*)",
    "I am Cathy! I am Pretty!ヽ(*´∀`)ﾉﾟ",
    "I am Karl! I am Awesome!ヽ(ﾟ∀。)ノ"
];

var roleImages = [
    'images/char-boy.png',
    'images/char-pink-girl.png',
    'images/char-cat-girl.png',
    'images/char-horn-boy.png',
];
var roleIndex;

//keep...
var speedUnit = 100;
var collisionProx = 20;



//points
var gemImages = [
    'images/GemGreen.png',
    'images/GemBlue.png',
    'images/GemOrange.png'
];
var gemIndex;
var scoresPerGem = 20;


var starImage = 'images/Star.png';
var scoresPerStar = 15;

var deduct = 3;
//music
var water = new Audio('sound/Water.mp3');

var Hit = new Audio('sound/Hit.mp3');
var gotStar = new Audio('sound/Star.mp3');
var gotGem = new Audio('sound/Gem.mp3');

var RyanYell = new Audio('sound/RyanYell.mp3');
var JoanneYell = new Audio('sound/JoanneYell.mp3');
var CathyYell = new Audio('sound/CathyYell.mp3');
var KarlYell = new Audio('sound/KarlYell.mp3');

var bgm = new Audio('sound/Ponies_and_Balloons.mp3');



//Statics
STATS = document.getElementById('Statics'); //Global scope
var livesIndex = 5;
var livesImages = [
    'images/Heart.png',
    'images/Heart.png',
    'images/Heart.png',
    'images/Heart.png',
    'images/Heart.png'
];
var minutes;
var sumScores = 0;


var GameItem = function() {
    this.col = 101;
    this.row = 83;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.Basic();
    this.speed = Math.floor(100 + (Math.random() * 200));




};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if (this.x > 550) {
        this.x = this.col;
        this.y += this.row;
        this.speed = Math.floor(100 + (Math.random() * 200));
        if (this.y > 226) {
            this.y = 60;
        }
    }

    if (player.y >= this.y - 45 && player.y <= this.y + 45) {
        if (player.x >= this.x - 45 && player.x <= this.x + 45) {
            switch (roleIndex) {
                case 0:
                    RyanYell.play();
                    break;
                case 1:
                    JoanneYell.play();
                    break;
                case 2:
                    CathyYell.play();
                    break;
                case 3:
                    KarlYell.play();
                    break;
            };
            Hit.play();
            // sumScores -= 2*deduct;
            player.reset();

        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.Basic = function() {
    this.col = -1;
    this.row = getRandomInit(2, 3);
    this.x = 101 * this.col;
    this.y = 83 * this.row;

};
Enemy.prototype.RandomSpeed = function() {
    this.speed = getRandomInit(2, 5);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function() {
    this.x = 202;
    this.y = 300;
    STATS.querySelector('.lives').innerHTML = '<img id="heart"' + 'src="' + livesImages.join('" />' +
        '<img id="heart"' + 'src="') + '" />';

};
//Reset position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 300;
    livesImages.length--;
    STATS.querySelector('.lives').innerHTML = '<img id="heart"' + 'src="' + livesImages.join('" />' +
        '<img id="heart"' + 'src="') + '" />';


    if (livesImages.length <= 0) {

        // alert('GameOver!Q_Q');
        gameOver();
        // window.location.reload(true);
    }
};
Player.prototype.InitPos = function() {
    this.x = 202;
    this.y = 300;
};
Player.prototype.update = function(dt) {


};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(roleImages[roleIndex]), this.x, this.y);
};

//keyboard handInput
Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left') {
        if (this.x < 101) {
            this.x = 0;
        } else {
            this.x -= 101; // If it's on the grid, move left by 100
        }
    } else if (keyCode == 'up') {
        if (this.y < 60) {
            sumScores -= deduct; //deduct points
            water.play();
            this.InitPos();
        } else {
            this.y -= 83;
        }
    } else if (keyCode == 'right') {
        if (this.x > 303) { //maximum  position bounce
            this.x = 404;
        } else {
            this.x += 101;
        }
    } else if (keyCode == 'down') {
        if (this.y > 300) { //Players maximum distance from the top of the canvas
            this.y = 383;
        } else {
            this.y += 83;
        }

    }
};


//Get Score


// Star class, set x  and y position  
var Star = function() {
    this.x = 101 * getRandomInit(0, 4);
    this.y = 83 * getRandomInit(1, 3);

};


// If player gets star, add got  points, new random location for star
Star.prototype.update = function() {
    if (player.y >= this.y - 50 && player.y <= this.y + 50) {
        if (player.x >= this.x - 50 && player.x <= this.x + 50) {
            gotStar.play();
            sumScores += scoresPerStar;
            this.x = 101 * getRandomInit(0, 4);
            this.y = 83 * getRandomInit(1, 3);
        }
    }
    STATS.querySelector('.points').innerHTML = sumScores;

};

// Draw the star on the screen. have to put the engine.js star.render();
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(starImage), this.x, this.y);
};

// Gem class, set x and y position
var Gem = function() {
    this.x = 101 * getRandomInit(0, 4);
    this.y = 83 * getRandomInit(1, 4);
};

// If player gets gem, and got points,and  random new location for gem
Gem.prototype.update = function() {
    if (player.y >= this.y - 50 && player.y <= this.y + 50) {
        if (player.x >= this.x - 50 && player.x <= this.x + 50) {
            gotGem.play();
            sumScores += scoresPerGem;
            this.x = 101 * getRandomInit(0, 4);
            this.y = 83 * getRandomInit(1, 3);
        }
    }
    STATS.querySelector('.points').innerHTML = sumScores;
};

// Draw the gem on the screen. have to put the engine.js star.render();
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(gemImages[0]), this.x, this.y);
};


/*All function */
//Random
function getRandomInit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//CountDown time
function getTimeFormate(endtime) {
    var timeF = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((timeF / 1000) % 60);
    var minutes = Math.floor((timeF / 1000 / 60) % 60);
    var hours = Math.floor((timeF / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeF / (1000 * 60 * 60 * 24));
    return {
        'total': timeF,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

function initClock(id, endtime) {
    var clock = document.getElementById('countdown');
    var minSpan = clock.querySelector('.minutes');
    var secSpan = clock.querySelector('.seconds');

    function updateClock() {
        var timeF = getTimeFormate(endtime);

        minSpan.innerHTML = ('0' + timeF.minutes).slice(-2);
        secSpan.innerHTML = ('0' + timeF.seconds).slice(-2);

        if (timeF.total <= 0) {
            clearInterval(timeInterval);
            // alert('GameOver!Q_Q');
            gameOver();
        }
    }

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
};

//CountDown time set 3:00
var deadline = new Date(Date.parse(new Date()) + 3 * 60 * 1000);


// Role select button
function roleChoice(roleId, imgIndex) {

    var uRole = document.getElementsByClassName('roleImg');
    var roleIntro = document.getElementById('roleIntro');

    for (var i = 0; i < uRole.length; i++) {
        uRole[i].style.border = 'none';
        uRole[i].style.borderRadius = 'none';
        uRole[i].style.boxShadow = 'none';
    }
    document.getElementById(roleId).style.border = '1px solid #333';
    document.getElementById(roleId).style.borderRadius = '10px';
    document.getElementById(roleId).style.boxShadow = '5px 5px 3px #030';
    roleIntro.style.display = 'flex';
    roleIntro.querySelector('h3').innerHTML = roleName[imgIndex];
    roleIntro.querySelector('p').innerHTML = roleInfo[imgIndex];


    roleIndex = imgIndex;
    userChoice = true;
};



// GameStart
function gameStart() {
    if (userChoice === true) {

        document.getElementById('GameBegin').style.display = 'none';
        document.getElementById('Statics').style.display = 'flex';
        document.getElementById('Sounds').style.display = 'flex';
        document.getElementById('myCanvas').style.display = 'flex';

        STATS.querySelector('.lives').innerHTML = '<img id="heart"' + 'src="' + livesImages.join('" />' +
            '<img id="heart"' + 'src="') + '" />';

        // music checkbox
        if (document.getElementById('bgm').checked = true) {
            // if checked ...
            bgm.play();
            bgm.volume = 0.5;
        } else {
            // if not checked ...
            bgm.muted = true;
        };
        // effect 
        document.getElementById('effect').onclick = function pauseAudio() {
            // access properties using this keyword
            if (this.checked) {
                // if checked ..
                water.muted = false;
                Hit.muted = false;
                gotGem.muted = false;
                gotStar.muted = false;
                RyanYell.muted = false;
                JoanneYell.muted = false;
                CathyYell.muted = false;
                KarlYell.muted = false;
                // alert('Checked');
            } else {
                // if not checked .
                water.muted = true;
                Hit.muted = true;
                gotGem.muted = true;
                gotStar.muted = true;
                RyanYell.muted = true;
                JoanneYell.muted = true;
                CathyYell.muted = true;
                KarlYell.muted = true;
                // alert('Not check');
            }
        };



        renderPaint = true;
        //Let's  Working!
        initClock('.countdown', deadline);
    } else {
        var roleIntro = document.getElementById('roleIntro');
        roleIntro.style.display = 'flex';
        roleIntro.querySelector('p').innerHTML = 'Please Select One Role Before You Start This Game! =皿=!';
        roleIntro.querySelector('p').style.color = '#F00';
        roleIntro.querySelector('p').style.fontSize = '1.2em';
        setTimeout('location.reload()', 3200);
    }
};
// At end of game, give points summary.
function gameOver() {
    bgm.pause();
    renderPaint = false;
    document.getElementById('pointsSum').innerHTML = sumScores;

    document.getElementById('Statics').style.display = 'none';
    document.getElementById('Sounds').style.display = 'none';
    document.getElementById('myCanvas').style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
    // setTimeout('location.reload()', 3200);

    var GameSum = document.getElementById('gameOver'); //Global scope

    if (sumScores < 0) {
        GameSum.querySelector('.Message').innerHTML = 'I cannot believe it! What the... oAo!0rzzzz!';
    } else if (sumScores <= 50) {
        GameSum.querySelector('.Message').innerHTML = 'So sad! I Hope You Could Play Happliy! Q_Q';
    } else if (sumScores < 300) {
        GameSum.querySelector('.Message').innerHTML = 'No sweat! You will Good Someday!';
    } else if (sumScores < 375) {
        GameSum.querySelector('.Message').innerHTML = 'Keep Fighting!';
    } else if (sumScores < 500) {
        GameSum.querySelector('.Message').innerHTML = 'Good Job!';
    } else if (sumScores < 750) {
        GameSum.querySelector('.Message').innerHTML = 'Excellent!';
    } else if (sumScores < 1000) {
        GameSum.querySelector('.Message').innerHTML = 'You Are God!';
    }
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


/*
 Sound effect from  
  "Taira Komori's Japanese Free Sound Effects": http://taira-komori.jpn.org/freesounden.html
  https://www.youtube.com/audiolibrary
  http://www.grsites.com/archive/sounds/
 

*/



var allEnemies = [];
for (var i = 1; i < 4; i++) {
    allEnemies.push(new Enemy());
};

var player = new Player();


var star = new Star();

var gem = new Gem();

/*testing*/
console.log(player.x, player.y);
console.log(allEnemies[0].x, allEnemies[0].y);
console.log(Star.prototype.render);
