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
            this.catPercent = this.calories / this.weight;
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
        const listItem = document.createElement('LI');
        const title = document.createElement('H2');
        title.innerText = this.foodName;
        listItem.classList.toggle(`${this.getColor()}`);
        const text = `${this.foodName} is a ${this.foodType} and has a caloric density of ${this.catPercent}. It is ${this.getColor()}`;
        listItem.append(title);
        listItem.append(text);
        render.append(listItem);

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
        if (this.drinks === "soda" || this.drinks === "alcohol") {
            this.catNum = this.catNum + 1;
        }

        else if (this.drinks === "artificial") {
            this.catNum = 2;
        }

    }
}

foodForm.elements.foodType.addEventListener('change', function (e) {
    if (foodForm.elements.foodType.value === 'solid') {
        document.querySelector('#wholeGrainDiv').classList.remove('d-none');
        document.querySelector('#drinksDiv').classList.add('d-none');

    }
    else if (foodForm.elements.foodType.value === 'soup') {
        document.querySelector('#wholeGrainDiv').classList.add('d-none');
        document.querySelector('#drinksDiv').classList.add('d-none');

    }
    else if (foodForm.elements.foodType.value === 'liquid') {
        document.querySelector('#wholeGrainDiv').classList.add('d-none');
        document.querySelector('#drinksDiv').classList.remove('d-none');

    }
})

foodForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let food1 = new Food(foodForm.elements.foodName.value, parseInt(foodForm.elements.calories.value), parseInt(foodForm.elements.weight.value), foodForm.elements.foodType.value, foodForm.elements.isWholeGrain.value, foodForm.elements.drinks.value);
    console.log(foodForm.elements.drinks.value)
    food1.getCategory();
    food1.checkWholeGrain();
    food1.checkDrinks();
    food1.render();
})



