// Intro
// reload: location.reload()
const body = document.body;

const headerCommands = document.getElementById('headerCommands');

window.onload = () => {
    body.style.animation = 'rising 5s';
    headerCommands.style.animation = 'buttons 1.5s infinite';
}

const header = document.querySelector('header');

const generateSection = document.getElementById('generateSection');

const planetNine = document.createElement('img');
planetNine.classList.add('section__planet-nine');
planetNine.src = './assets/images/planet-nine.png';

// Quando essa função for utilizada, a seção de instruções será montada
const instructions = () => {
    header.style.marginBottom = '50px';
    generateSection.innerHTML = '';

    generateSection.style.animation = 'rising 2s';

    const instructionsTitle = document.createElement('h2');
    instructionsTitle.classList.add('section__instructions-title');
    instructionsTitle.innerText = 'Instructions';

    const instructionsList = document.createElement('ol');
    instructionsList.classList.add('section__instructions-list');

    const instructionsArray = ['To move the spaceship, use the Arrow Keys on your keyboard.',
                               'Your mission is to reach the Planet 9.'];
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
        generateSection.innerHTML = '';
        header.innerHTML = '';

        body.classList.add('body__background');

        board.style.animation = 'rising 5s';

        generateMaze();

        // spaceshipInside.style.animation = 'spaceship-arrive 5s';
    }); 
}

const board = document.createElement('div');
board.classList.add('map-board');

const spaceshipInside = document.createElement('img');
spaceshipInside.id = 'insideSpaceship';
spaceshipInside.src = './assets/images/spaceshipright.png';

const spaceship = document.getElementById('spaceship');

const pressNext = document.getElementById('pressNext');

pressNext.addEventListener('click', () => {

    spaceship.style.animation = 'spaceship-launcher 1s';
    setTimeout(instructions, 1000);
    headerCommands.innerText = 'Press Start';
});

const generateMaze = () => {
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

    const player = {
        j: 9,
        k: 0,
        spaceship: document.getElementById('insideSpaceship')
    }
    
    

    document.addEventListener('keydown', (evt) => {
        const key = evt.key;

        if (key === 'ArrowRight') {
            player.spaceship.src = './assets/images/spaceshipright.png';

            if (document.getElementById(`${player.j}-${player.k + 1}`).dataset.type === 'B') {
                player.k++;

                document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
            }
            // } else if (document.getElementById(`${player.j}-${player.k + 1}`).dataset.type === 'W') {
            //     console.log('wall');
            // }
        }

        else if (key === 'ArrowLeft') {
            player.spaceship.src = './assets/images/spaceshipleft.png';

            if (document.getElementById(`${player.j}-${player.k - 1}`).dataset.type === 'B') {
                player.k--;

                document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
            }
        }

        else if (key === 'ArrowUp') {
            player.spaceship.src = './assets/images/spaceshipup.png';

            if (document.getElementById(`${player.j - 1}-${player.k}`).dataset.type === 'B') {
                player.j--;

                document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
            }
        }

        else if (key === 'ArrowDown') {
            player.spaceship.src = './assets/images/spaceshipdown.png';

            if (document.getElementById(`${player.j + 1}-${player.k}`).dataset.type === 'B') {
                player.j++;

                document.getElementById(`${player.j}-${player.k}`).appendChild(player.spaceship);
            }
        }
    });

    


}






