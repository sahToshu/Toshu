//1
enum Role {
    Admin = 1,
    Guest
}
class Logger {
    log(input: string | number | object): void {
        if (typeof input === 'string') {
            console.log(`Logging string: ${input}`);
        } else if (typeof input === 'number') {
            console.log(`Logging number: ${input}`);
        } else {
            console.log(`Logging object: ${JSON.stringify(input)}`);
        }
    }
}

interface User {
    getRole(): Role;
}

class Admin implements User {
    role: Role = 1;
    getRole(): Role {
        return this.role;
    }
}

class Guest implements User {
    role: Role = 2;
    getRole(): Role {
        return this.role;
    }
}
//2
type Dish = {
    name: string;
    price: number;
};

interface Restaurant {
    getMenu(): Dish[];
    orderDish(dishName: string): string;
}

class FastFoodRestaurant implements Restaurant {
    private menu: Dish[] = [
        { name: 'Hamburger', price: 5 },
        { name: 'Fries', price: 3 },
        { name: 'Cola', price: 2 }
    ];

    getMenu(): Dish[] {
        return this.menu;
    }

    orderDish(dishName: string): string {
        return this.menu.find(d => d.name === dishName) ? `Ordered: ${dishName}` : `Dish not found`;
    }
}

class ItalianRestaurant implements Restaurant {
    private menu: Dish[] = [
        { name: 'Pizza', price: 10 },
        { name: 'Pasta', price: 8 },
        { name: 'Tiramisu', price: 6 }
    ];

    getMenu(): Dish[] {
        return this.menu;
    }

    orderDish(dishName: string): string {
        return this.menu.find(d => d.name === dishName) ? `Ordered: ${dishName}` : `Dish not found`;
    }
}

class VeganRestaurant implements Restaurant {
    private menu: Dish[] = [
        { name: 'Smoothie', price: 7 },
        { name: 'Avocado Toast', price: 5 },
        { name: 'Salad', price: 6 }
    ];

    getMenu(): Dish[] {
        return this.menu;
    }

    orderDish(dishName: string): string {
        return this.menu.find(d => d.name === dishName) ? `Ordered: ${dishName}` : `Dish not found`;
    }
}

class FoodDeliveryService {
    private restaurants: Restaurant[] = [];

    addRestaurant(restaurant: Restaurant): void {
        this.restaurants.push(restaurant);
    }

    getMenu(restaurantId: number): Dish[] {
        return this.restaurants[restaurantId]?.getMenu() || [];
    }
}
//3
abstract class Person {
    protected name: string;
    protected hours: number = 0;
    protected money: number = 0;
    protected salaryPerHour: number = 30;
    protected defaultNumbersHour: number = 160;

    constructor(name:string = `Person_${Math.random().toString(36).slice(2, 7)}`) {
        this.name = name; 
    }

    abstract calculateSalary(hoursWorked: number): number;

    set Name(value: string) {
        if (value.trim()) {
            this.name = value;
        }
    }    
    get Name(): string {
        return this.name;
    }
    get Money(): number {
        return this.money;
    }
}

class Professor extends Person {
    calculateSalary(hoursWorked: number): number {
        const baseSalary = this.salaryPerHour * 3 * Math.min(hoursWorked, this.defaultNumbersHour);
        const overtime = Math.max(hoursWorked - this.defaultNumbersHour, 0) * this.salaryPerHour * 5;
        return baseSalary + overtime + 2000;
    }
}

class Student extends Person {
    calculateSalary(hoursWorked: number): number {
        const baseSalary = this.salaryPerHour * 0.5 * Math.min(hoursWorked, this.defaultNumbersHour);
        const overtime = Math.max(hoursWorked - this.defaultNumbersHour, 0) * this.salaryPerHour * 1;
        const randomProfit = Math.floor(Math.random() * 1401) - 700;
        return baseSalary + overtime + randomProfit;
    }
}

class Staff extends Person {
    calculateSalary(hoursWorked: number): number {
        const baseSalary = this.salaryPerHour * 1.2 * Math.min(hoursWorked, this.defaultNumbersHour);
        const overtime = Math.max(hoursWorked - this.defaultNumbersHour, 0) * this.salaryPerHour * 2;
        return baseSalary + overtime;
    }
}

const employees: Person[] = [
    ...Array(3).fill(null).map(() => new Professor()),
    ...Array(10).fill(null).map(() => new Student()),
    ...Array(3).fill(null).map(() => new Staff())
];

const daysInMonth = 20;
const monthsInYear = 12;

for (let month = 1; month <= monthsInYear; month++) {
    employees.forEach(employee => {
        let totalHours = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const dailyHours = 8 + Math.floor(Math.random() * 5) - 1;
            totalHours += dailyHours;
        }

        const salary = employee.calculateSalary(totalHours);
        (employee as any).money += salary;
    });
}

console.log(employees.map(e => ({ Name: e.Name, Money: e.Money })));
