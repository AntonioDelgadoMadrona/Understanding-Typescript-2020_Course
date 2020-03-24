// PROJECT TYPE
enum ProjectStatus { Active, Finished };

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {

    }
}

// PROJECT STATE MANAGEMENT

type Listener = (items: Project[]) => void;

class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() {

    }

    static getInstnce() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        console.log(newProject);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projecState = ProjectState.getInstnce();

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

// PROJECT LIST CLASS
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.assignedProjects = [];

        projecState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status = ProjectStatus.Active;
                }
                return prj.status = ProjectStatus.Finished;

            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
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
            projecState.addProject(title, desc, people);
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
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');