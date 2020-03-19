// FORM VALIDATION
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

// AUTOBIND DECORATOR
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const bouundFn = originalMethod.bind(this);
            return bouundFn;
        }
    };
    return adjDescriptor;
}


// CREATE A CLASS FOR CONTROL THE INPUTS
class ProjectInput {
    // GIVE EVERY TYPE
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElemnet: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    // MOUNT THE PROPERTIES
    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;    // GET ELEMENT BY ID AS HTML TEMPLATE ELEMENT
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;   // 
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElemnet = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();   // RUNS THE CONFIGURE
        this.attach();  // RUNS WHEN INSERT THE ELEMENT
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElemnet.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peoppleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peoppleValidatable)) {
            alert('Invalid input, please try again!')
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElemnet.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    // DEFINE WHAT WILL DO A SUBMIT CLICK 
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    // DEFINE IN WHAT MOMENT MOUNT THE APP
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();