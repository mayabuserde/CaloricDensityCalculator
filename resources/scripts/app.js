// const foodName = document.querySelector('#foodName');
// const calories = document.querySelector('#calories');
// const weight = document.querySelector('#weight');
// const foodType = document.querySelector('#foodType');
const render = document.querySelector('.render');
const foodForm = document.querySelector('#food-items');

class Food {
    constructor(foodName, calories, weight, foodType, isWholeGrain, drinks) {
        this.foodName = foodName,
            this.calories = calories,
            this.weight = weight,
            this.foodType = foodType,
            this.catNum = 0,
            this.isWholeGrain = isWholeGrain,
            this.drinks = drinks,
            this.catPercent = Math.round(this.calories / this.weight * 10) / 10,
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
        // document.querySelector('#results').classList.remove('hidden');
        document.querySelector('.display-name').textContent = `${this.foodName}`;
        document.querySelector('#display-type-capitalized').textContent = `${this.foodName}`;
        document.querySelector('.display-type').textContent = ` is a ${this.foodType}.`;
        document.querySelector('.display-calories').textContent = `One serving is ${this.weight} grams or ml and contains ${this.calories} calories.`;
        if ((this.foodType === 'solid') || (this.foodType === 'liquid')) {
            document.querySelector('#display-additional-capitalized').textContent = `${this.foodName}`;
            document.querySelector('.display-additional').textContent = ` ${this.additional}.`;
        }
        document.querySelector('.cd-box').classList.remove('green', 'yellow', 'red');
        document.querySelector('.cd-box').classList.toggle(this.getColor());
        document.querySelector('.cd-box').textContent = `Caloric Density: ${this.catPercent}`;

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

        if ((this.drinks) && (this.foodType === 'liquid')) {
            if (this.drinks === "alcohol") {

                this.additional = 'contains alcohol';
            }
            else if (this.drinks === "soda") {

                this.additional = 'contains sugar';
            }

            else if (this.drinks === "artificial") {

                this.additional = 'contains artificial sweeteners';
            }

            else if (this.drinks === "none") {
                this.additional = 'contains no sugar, alcohol, or artificial sweeteners'
            }
        }

        if ((this.isWholeGrain) && (this.foodType === 'solid')) {

            if (this.isWholeGrain === 'yes') {

                this.additional = 'is whole grain/wheat';

            } else if (this.isWholeGrain === 'no') {
                this.additional = 'is NOT Whole grain';
            }
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
    console.log(food1);
})



