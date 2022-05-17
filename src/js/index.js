// VARIABLES *****************************************************

// outputs
const tip_total = document.querySelector('.tip_result .total');
const tip_amount = document.querySelector('.tip_result .amount');

// inputs
const bill = document.querySelector('#bill');
bill.addEventListener('input', (b) => { selectBill(b) });

btn_5.addEventListener('click', (e) => { selectPercentage(e) });
btn_10.addEventListener('click', (e) => { selectPercentage(e) });
btn_15.addEventListener('click', (e) => { selectPercentage(e) });
btn_25.addEventListener('click', (e) => { selectPercentage(e) });
btn_50.addEventListener('click', (e) => { selectPercentage(e) });
const custom = document.querySelector('#custom');
custom.addEventListener('input', (e) => { selectPercentage(e) });

const people = document.querySelector('#people');
people.addEventListener('blur', (p) => { numberPersons(p)});

reset.addEventListener('click', (r) => { resetApp(r) });

let percentage;
let persons;
let recipe;
let idButton;

eventListeners();

// FUNCTIONS *****************************************************
function eventListeners() {
    document.addEventListener('DOMContentLoaded', initApp);
}

function initApp() {
    resetApp();
    calcTip();
    reset.disabled = true;
}

function selectPercentage(e) {

    percentage = parseFloat(e.target.value)/100;

    if(!percentage) {
        percentage = 0;
    }

    if(e.type === 'click') {
        custom.value = '';
    }

    resetBtnPercentage();

    idButton = `#${ e.target.id }`;
    const btnPress = document.querySelector( idButton );
    btnPress.classList.add('pressed');
    
    calcTip()
    
    return percentage;
}

function selectBill(b) {
    recipe = parseFloat(b.target.value);
    if(!recipe) {
        recipe = 0;
    }
    calcTip();

    return recipe;
}

function numberPersons(p) {
    persons = parseFloat(p.target.value);

    const cantBeZero = document.querySelector('#cantBeZero');
    if(!persons || persons === 0) {
        cantBeZero.classList.remove('noZero');
        people.classList.add('borderZero');
    } else {
        cantBeZero.classList.add('noZero');
        people.classList.remove('borderZero');
    }

    calcTip();

    return persons;
}

function calcTip() {

    reset.disabled = false;

    let tipTotal = recipe * percentage;
    tip_total.textContent = `$${ tipTotal.toFixed(2) }`;


    let tipAmount = tipTotal / persons;
    if(!persons || persons === 0) {
        tipAmount = 0;
    }
    tip_amount.textContent = `$${ tipAmount.toFixed(2) }`;

}

function resetBtnPercentage() {

    if(idButton) {
        const idButtonPast = document.querySelector( idButton );
        idButtonPast.classList.remove('pressed');
     }

}

function resetApp(r) {

    bill.value = '';
    custom.value = '';
    people.value = '';

    persons = 0;
    recipe = 0;
    percentage = 0;

    if(idButton) {
        const idButtonPast = document.querySelector( idButton );
        idButtonPast.classList.remove('pressed');
     }

    cantBeZero.classList.add('noZero');
    people.classList.remove('borderZero');

    
    resetBtnPercentage()
    calcTip();
    
    reset.disabled = true;
}