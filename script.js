// Intro

const body = document.body;

const headerCommands = document.getElementById('headerCommands');

window.onload = () => {
    body.style.animation = 'rising 5s';
    headerCommands.style.animation = 'buttons 1.5s infinite';
}
const header = document.querySelector('header');

const generateSection = document.getElementById('generateSection');

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

    const instructionsArray = ['To move the spaceship, use the arrow keys on your keyboard.',
                               'Your mission is to reach Planet 9.'];
    let c = 1;

    instructionsArray.forEach( item => {

        const instructionsItem = document.createElement('li');
        instructionsItem.classList.add('section__instructions-list__item');
        instructionsItem.innerText = `${c}- ${item}`;

        instructionsList.appendChild(instructionsItem);

        c++;
    });

    const planetNine = document.createElement('img');
    planetNine.classList.add('section__planet-nine');
    planetNine.src = './assets/images/planet-nine.png';

    const instructionsParagraph = document.createElement('p');
    instructionsParagraph.classList.add('section__instructions-paragraph');
    instructionsParagraph.innerText = 'The Space Forces are counting on you, young Cadet!';

    const goodLuck = document.createElement('p');
    goodLuck.classList.add('section__good-luck');
    goodLuck.innerText = 'Good Luck!';

    const pressStart = document.createElement('button');
    pressStart.classList.add('section__button');
    pressStart.innerText = 'START >';

    generateSection.appendChild(instructionsTitle);
    generateSection.appendChild(instructionsList);
    generateSection.appendChild(planetNine);
    generateSection.appendChild(instructionsParagraph);
    generateSection.appendChild(goodLuck);
    generateSection.appendChild(pressStart);
}

const generateMaze = () => {

}
const spaceship = document.getElementById('spaceship');

const pressNext = document.getElementById('pressNext');

pressNext.addEventListener('click', () => {
    

    spaceship.style.animation = 'spaceship-launcher 1s';
    setTimeout(instructions, 1000);
    headerCommands.innerText = 'Press Start';
})