// soundEffects
const mainThemeMusic = document.createElement('audio');
mainThemeMusic.src = './src/assets/sounds/8\ BIT\ Interstellar\ Main\ Theme\ Hans\ Zimmer\ 8\ BIT.mp3';
mainThemeMusic.loop = 'true';
mainThemeMusic.volume = 0.5;
mainThemeMusic.playbackRate = 1.20;

const victoryMusic = document.createElement('audio');
victoryMusic.src = './src/assets/sounds/Interstellar\ main\ theme\ 8-bit.mp3';
victoryMusic.loop = 'true';
victoryMusic.volume = 0.6;

const spaceshipLaunch = document.createElement('audio');
spaceshipLaunch.src = './src/assets/sounds/spacechip-launch.mp3';
spaceshipLaunch.currentTime = 0;
spaceshipLaunch.playbackRate = 5;

const spaceshipPassing = document.createElement('audio');
spaceshipPassing.src = './src/assets/sounds/final.mp3';

const spaceshipMoving = document.createElement('audio');
spaceshipMoving.src = './src/assets/sounds/spaceship-moving.mp3';

const bipSound = document.createElement('audio');
bipSound.src = './src/assets/sounds/bip.mp3';
// soundEffects

const body = document.body;

const headerCommands = document.getElementById('headerCommands');

window.onload = () => {
    body.classList.add('body__animation-init');

    headerCommands.style.animation = 'buttons 1.5s infinite';
}

const header = document.querySelector('header');

const generateSection = document.getElementById('generateSection');

const planetNine = document.createElement('img');
planetNine.classList.add('section__planet-nine');
planetNine.src = './src/assets/images/planet-nine.png';

const instructions = () => {
    header.classList.add('header--instructions');

    generateSection.innerHTML = '';

    generateSection.style.animation = 'rising 2s';

    const instructionsTitle = document.createElement('h2');
    instructionsTitle.classList.add('section__instructions-title');
    instructionsTitle.innerText = 'Instructions';

    const instructionsList = document.createElement('ol');
    instructionsList.classList.add('section__instructions-list');

    const instructionsArray = ['To move the spaceship, use the Arrow Keys on your keyboard.',
                               'Your mission is to reach the Planet 9:'];
    let c = 1;

    instructionsArray.forEach( item => {

        const instructionsItem = document.createElement('li');
        instructionsItem.classList.add('section__instructions-list__item');
        instructionsItem.innerText = `${c}- ${item}`;

        instructionsList.appendChild(instructionsItem);

        c++;
    });

    const instructionsParagraph = document.createElement('p');
    instructionsParagraph.classList.add('section__instructions-paragraph');
    instructionsParagraph.innerText = 'The Space Forces are counting on you, young Cadet!';

    const goodLuck = document.createElement('p');
    goodLuck.classList.add('section__good-luck');
    goodLuck.innerText = 'Good Luck!';

    const pressStart = document.createElement('button');
    pressStart.id = 'pressStart';
    pressStart.classList.add('section__button');
    pressStart.innerText = 'START >';

    generateSection.appendChild(instructionsTitle);
    generateSection.appendChild(instructionsList);
    generateSection.appendChild(planetNine);
    generateSection.appendChild(instructionsParagraph);
    generateSection.appendChild(goodLuck);
    generateSection.appendChild(pressStart);

    const startButton = document.getElementById('pressStart');

    startButton.addEventListener('click', () => {
        spaceshipPassing.play();

        generateSection.innerHTML = '';
        header.innerHTML = '';

        body.classList.add('body__animation-game');
        body.classList.add('body-game-background');
        
        generateMaze();

        body.removeChild(header);
        body.classList.add('body__end');
    }); 
}

const board = document.createElement('div');
board.classList.add('map-board');

const spaceshipInside = document.createElement('img');
spaceshipInside.id = 'insideSpaceship';
spaceshipInside.src = './src/assets/images/spaceshipright.png';

const spaceship = document.getElementById('spaceship');

const pressNext = document.getElementById('pressNext');

pressNext.addEventListener('click', () => {
    mainThemeMusic.play();
    spaceshipLaunch.play();

    body.classList.remove('body__animation-init');

    spaceship.style.animation = 'spaceship-launcher 1s';
    
    setTimeout(instructions, 1000);

    headerCommands.innerText = 'Press Start';
});

const disableKeyBoard = () => {
    document.onkeydown = (e) => {
        console.log(false)
        return false;
    }
}

const generateMaze = () => {
    spaceshipInside.classList.add('inside-spaceship-animation');

    setTimeout(function () {
        spaceshipInside.classList.remove('inside-spaceship-animation');

        body.classList.remove('body__animation-game');

    }, 5000);

    const map = [
        "WWWWWWWWWWWWWWWWWWWWW",
        "W   W     W     W W W",
        "W W W WWW WWWWW W W W",
        "W W W   W     W W   W",
        "W WWWWWWW W WWW W W W",
        "W         W     W W W",
        "W WWW WWWWW WWWWW W W",
        "W W   W   W W     W W",
        "W WWWWW W W W WWW W F",
        "S     W W W W W W WWW",
        "WWWWW W W W W W W W W",
        "W     W W W   W W W W",
        "W WWWWWWW WWWWW W W W",
        "W       W       W   W",
        "WWWWWWWWWWWWWWWWWWWWW",
    ];

    const newMap = [];

    for (let i = 0; i < map.length; i++) {
        newMap.push(map[i].split(''));
    }

    for (let j = 0; j < newMap.length; j++) {
        for (let k = 0; k < newMap[j].length; k++) {
            const houses = document.createElement('div');
            houses.id = `${j}-${k}`;

            if (newMap[j][k] === 'W') {
                houses.classList.add('maze-wall');
                houses.setAttribute('data-type', 'W');

                board.appendChild(houses);

            } else if (newMap[j][k] === ' ') {
                houses.classList.add('maze-space');
                houses.setAttribute('data-type', 'B'); // B for BLANK

                board.appendChild(houses);

            } else if (newMap[j][k] === 'S') {
                spaceshipInside.classList.add('maze-spaceship');
                houses.classList.add('maze-space');
                houses.setAttribute('data-type', 'S');

                houses.appendChild(spaceshipInside);

                board.appendChild(houses);
            } else {
                planetNine.classList.add('maze-planet-nine');
                houses.classList.add('maze-space');
                houses.setAttribute('data-type', 'F');
                houses.appendChild(planetNine);
                board.appendChild(houses);
            }

        }
    }

    generateSection.appendChild(board);

    let player = {
        j: 9,
        k: 0,
        spaceship: spaceshipInside
    }

    disableKeyBoard();

    setTimeout (function () {
        document.onkeydown = (evt) => {
            const key = evt.key;
    
            movingTheSpaceship(key, player);
        }
    }, 5000);
}


const movingTheSpaceship = (evt, player) => {

    if (evt === 'ArrowRight') {
        spaceshipMoving.play();

        player.spaceship.src = './src/assets/images/spaceshipright.png';
        
        player.spaceship.classList.add('inside-spaceship-slideRight');

        setTimeout(function () {
            player.spaceship.classList.remove('inside-spaceship-slideRight')
        }, 100);

        if (document.getElementById(`${player.j}-${player.k + 1}`).id === '8-20') {
            winningCondition(player.spaceship);
        }

        if (document.getElementById(`${player.j}-${player.k + 1}`).dataset.type === 'B') {
            player.k++;

            document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
        }
    }

    else if (evt === 'ArrowLeft') {
        spaceshipMoving.play();

        player.spaceship.src = './src/assets/images/spaceshipleft.png';

        player.spaceship.classList.add('inside-spaceship-slideLeft');

        setTimeout(function () {
            player.spaceship.classList.remove('inside-spaceship-slideLeft')
        }, 100);

        if (document.getElementById(`${player.j}-${player.k - 1}`).dataset.type === 'B') {
            player.k--;

            document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
        }
    }

    else if (evt === 'ArrowUp') {
        spaceshipMoving.play();

        player.spaceship.src = './src/assets/images/spaceshipup.png';

        player.spaceship.classList.add('inside-spaceship-slideTop');

        setTimeout(function () {
            player.spaceship.classList.remove('inside-spaceship-slideTop')
        }, 100);

        if (document.getElementById(`${player.j - 1}-${player.k}`).dataset.type === 'B') {
            player.j--;

            document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
        }
    }

    else if (evt === 'ArrowDown') {
        spaceshipMoving.play();

        player.spaceship.src = './src/assets/images/spaceshipdown.png';

        player.spaceship.classList.add('inside-spaceship-slideDown');

        setTimeout(function () {
            player.spaceship.classList.remove('inside-spaceship-slideDown')
        }, 100);

        if (document.getElementById(`${player.j + 1}-${player.k}`).dataset.type === 'B') {
            player.j++;

            document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
        }
    }
}

const winningCondition = (spaceship) => {
    disableKeyBoard();

    mainThemeMusic.pause();

    
    spaceshipPassing.play();

    victoryMusic.currentTime = 0;
    victoryMusic.play();

    const mazeEnd = document.getElementById('8-20');

    mazeEnd.removeChild(planetNine);

    mazeEnd.appendChild(spaceship);

    setTimeout(victoryAnimation, 400);
}

const victoryAnimation = () => {
    generateSection.innerHTML = '';

    body.classList.remove('body-game-background');

    const planetNine = document.createElement('img');
    planetNine.src = './src/assets/images/planet-nine.png';
    planetNine.classList.add('popup__planetNine');

    const spaceship = document.createElement('img');
    spaceship.src = './src/assets/images/spaceshipup.png';
    spaceship.classList.add('spaceship-end-1');
    
    generateSection.appendChild(planetNine);
    generateSection.appendChild(spaceship);

    setTimeout(function () {
        generateSection.innerHTML = '';

        victoryPopUp();
    }, 7500);
}

const victoryPopUp = () => {
    const popupDiv = document.createElement('div');
    popupDiv.classList.add('popup');
    popupDiv.classList.add('popup__animation');

    const popupTitle = document.createElement('h2');
    popupTitle.innerText = 'CONGRATULATIONS!';
    popupTitle.classList.add('popup__title');

    const popupParagraphArray = [
        'You made it young Cadet!',
        'You\'ve accomplished your mission!',
        'What do you want to do now?'
    ];

    const popupParagraphNest = document.createElement('div');

    popupParagraphArray.forEach( item => {
        const popupParagraph = document.createElement('p');
        popupParagraph.innerText = item;
        popupParagraph.classList.add('popup__paragraph');

        popupParagraphNest.appendChild(popupParagraph);
    });
    

    const popupImg = document.createElement('img');
    popupImg.src = './src/assets/images/the-eye.png';
    popupImg.classList = 'popup__img';

    const buttonsNest = document.createElement('div');
    buttonsNest.classList.add('buttons-nest');

    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.classList.add('popup__button');
    resetButton.innerText = 'PLAY AGAIN';

    const exitButton = document.createElement('button');
    exitButton.id = 'exitButton';
    exitButton.classList.add('popup__button--red');
    exitButton.innerText = 'EXIT X';

    buttonsNest.appendChild(resetButton);
    buttonsNest.appendChild(exitButton);

    popupDiv.appendChild(popupTitle);
    popupDiv.appendChild(popupParagraphNest);
    popupDiv.appendChild(popupImg);
    popupDiv.appendChild(buttonsNest);

    generateSection.appendChild(popupDiv);

    document.getElementById('resetButton').addEventListener('click', () => {
        generateSection.innerHTML = '';
        board.innerHTML = '';

        body.classList.add('body__animation-game');
        body.classList.add('body-game-background');

        victoryMusic.pause();

        spaceshipPassing.play();

        mainThemeMusic.currentTime = 0;
        mainThemeMusic.play();
        
        generateMaze();
    });

    document.getElementById('exitButton').addEventListener('click', () => {
        bipSound.play();
        setTimeout( function () {
            location.reload();
        }, 500);
        
    });
}






