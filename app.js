// const foodName = document.querySelector('#foodName');
// const calories = document.querySelector('#calories');
// const weight = document.querySelector('#weight');
// const foodType = document.querySelector('#foodType');
const render = document.querySelector('.render');
const foodForm = document.querySelector('#foodForm');

class Food {
    constructor(foodName, calories, weight, foodType) {
        this.foodName = foodName,
            this.calories = calories,
            this.weight = weight,
            this.foodType = foodType,
            this.catNum = 0
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
}



foodForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let food1 = new Food(foodForm.elements.foodName.value, parseInt(foodForm.elements.calories.value), parseInt(foodForm.elements.weight.value), foodForm.elements.foodType.value)
    console.log(food1);
    food1.getCategory();
    food1.render();
})



