// const foodName = document.querySelector('#foodName');
// const calories = document.querySelector('#calories');
// const weight = document.querySelector('#weight');
// const foodType = document.querySelector('#foodType');
const render = document.querySelector('.render');
const foodForm = document.querySelector('#foodForm');

class Food {
    constructor(foodName, calories, weight, foodType, isWholeGrain, drinks) {
        this.foodName = foodName,
            this.calories = calories,
            this.weight = weight,
            this.foodType = foodType,
            this.catNum = 0,
            this.isWholeGrain = isWholeGrain,
            this.drinks = drinks,
            this.catPercent = Math.round(this.calories / this.weight * 10) / 10;
        this.additional = ''
    }
    getCategory() {
        switch (this.foodType) {
            case 'solid': {
                if (this.catPercent <= 1.0) {
                    this.catNum = 1;

                }
                else if (this.catPercent > 1.0 && this.catPercent <= 2.4) {
                    this.catNum = 2;

                }
                else {
                    this.catNum = 3;

                }
                break;
            }
            case 'liquid': {
                if (this.catPercent <= 0.4) {
                    this.catNum = 1;

                }
                else if (this.catPercent > 0.4 && this.catPercent <= 0.5) {
                    this.catNum = 2;

                }
                else {
                    this.catNum = 3;

                }
                break;

            }
            case 'soup': {
                if (this.catPercent <= 0.5) {
                    this.catNum = 1;

                }
                else if (this.catPercent > 0.5 && this.catPercent <= 1.0) {
                    this.catNum = 2;

                }
                else {
                    this.catNum = 3;

                }
                break;

            }
            default:
                alert('Please choose a category');
        }
    }
    render() {
        document.querySelector('.display-name').textContent = `Name: ${this.foodName}`;
        document.querySelector('.display-calories').textContent = `Calories: ${this.calories}`;
        document.querySelector('.display-weight').textContent = `Weight/Volume: ${this.weight}`;
        document.querySelector('.display-type').textContent = `Food type: ${this.foodType}`;
        document.querySelector('.display-additional').textContent = `Additional information: ${this.additional}`;
        document.querySelector('.cd-box').classList.remove('hidden', 'green', 'yellow', 'red');
        document.querySelector('.cd-box').classList.toggle(this.getColor());
        document.querySelector('.cd-box').textContent = `Calorie Density ${this.catPercent} -- ${this.getColor()}`;


        // const split = document.createElement('DIV');
        // split.classList.add('split');
        // const text = document.createElement('DIV');
        // text.classList.add('text');
        // const cdBox = document.createElement('DIV');
        // cdBox.classList.add('cd-box');
        // cdBox.classList.add(this.getColor());
        // const title = document.createElement("H3");
        // title.textContent = this.foodName;
        // const caloriesText = document.createElement("P");
        // caloriesText.textContent = `Calories: ${this.calories}`;
        // const weightText = document.createElement("P");
        // weightText.textContent = `Weight (g or ml): ${this.weight}`;
        // const foodTypeText = document.createElement("P");
        // foodTypeText.textContent = `Food type: ${this.foodType}`;
        // const additionalText = document.createElement("P");
        // additionalText.textContent = `Additional: ${this.additional}`;

        // // cdBox.innerHTML = '<p>Caloric Density</p>';

        // const catText = document.createElement("blockquote");
        // catText.textContent = this.catPercent;
        // const colorText = document.createElement("SPAN");
        // colorText.textContent = this.getColor();
        // cdBox.append(catText, colorText);
        // text.append(title, caloriesText, weightText, foodTypeText, additionalText);
        // split.append(text, cdBox);
        // render.append(split);







    }

    getColor() {
        switch (this.catNum) {
            case 1: {
                this.color = 'green';
                break;
            }
            case 2: {
                this.color = 'yellow';
                break;
            }
            case 3: {
                this.color = 'red';
                break;
            }

        }
        return this.color;
    }

    checkWholeGrain() {
        if (this.isWholeGrain === 'yes' && this.catNum > 1) {
            this.catNum = this.catNum - 1;

        }
    }

    checkDrinks() {
        if (this.drinks === "alcohol" && this.catNum < 3) {
            this.catNum = this.catNum + 1;

        }
        else if (this.drinks === "soda" && this.catNum < 3) {
            this.catNum = this.catNum + 1;

        }

        else if (this.drinks === "artificial") {
            this.catNum = 2;

        }


    }

    checkAdditional() {
        if (this.drinks === "alcohol") {

            this.additional = 'Contains alcohol';
        }
        else if (this.drinks === "soda") {

            this.additional = 'Contains sugar';
        }

        else if (this.drinks === "artificial") {

            this.additional = 'Contains artificial sweeteners';
        }

        else if (this.drinks === "none") {
            this.additional = 'Contains no sugar, alcohol, or artificial sweeteners'
        }

        else if (this.isWholeGrain === 'yes') {

            this.additional = 'Whole Grain';

        } else if (this.isWholeGrain === 'no') {
            this.additional = 'Not Whole Grain';
        }
    }
}

foodForm.elements.foodType.addEventListener('change', function (e) {
    if (foodForm.elements.foodType.value === 'solid') {
        document.querySelector('#wholeGrainDiv').classList.remove('hidden');
        document.querySelector('#drinksDiv').classList.add('hidden');

    }
    else if (foodForm.elements.foodType.value === 'soup') {
        document.querySelector('#wholeGrainDiv').classList.add('hidden');
        document.querySelector('#drinksDiv').classList.add('hidden');

    }
    else if (foodForm.elements.foodType.value === 'liquid') {
        document.querySelector('#wholeGrainDiv').classList.add('hidden');
        document.querySelector('#drinksDiv').classList.remove('hidden');

    }
})

foodForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let food1 = new Food(foodForm.elements.foodName.value, parseInt(foodForm.elements.calories.value), parseInt(foodForm.elements.weight.value), foodForm.elements.foodType.value, foodForm.elements.isWholeGrain.value, foodForm.elements.drinks.value);
    food1.getCategory();
    food1.checkWholeGrain();
    food1.checkDrinks();
    food1.checkAdditional();
    food1.render();
})



