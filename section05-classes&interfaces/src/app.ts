class Department {
    private readonly id: string;
    public name: string = 'DEFAULT';
    private employees: string[] = [];   // ONLY IS POSSIBLE TO EDIT IT FROM INSIDE THE CLASS

    constructor(id: string, n: string) {
        this.id = id;
        this.name = n;
    }

    describe(this: Department) {
        console.log(`Department: (${this.name}) + ${this.id}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    createEmployee(name: string){
        return { name: name };
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting = new Department('d1', 'Accounting');

accounting.addEmployee('Toni');
accounting.addEmployee('Cesar');

accounting.name = 'Logistics';

// accounting.employees[2] = 'Anna';    // NOT POSSIBLE

accounting.printEmployeeInformation();

accounting.describe();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();




// HERENCY
class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {   // THIS IS SHORTEST THAN BEFORE
        super(id, 'IT');
    }
}

const it = new ITDepartment('d2', ['Charles']);

class AccountingDepartment extends Department {

    private lastReport: string;

    getmostRecentReport() {
        if (this.lastReport) {
            return this.lastReport
        }
        throw new Error('no report found.');
    }

    set mostRecentReport(value: string) {
        if (!value) throw new Error('Please enter a value.')
        this.addReport(value):
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'IT')
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

const acc = new AccountingDepartment('H2', []);

acc.addReport('Something went wrong!');

acc.printReports();