
enum Status {
    online = 1,
    offline = 2,
    ban = 3,
}

enum Role {
    Admin = 1,
    Moder = 2,
    Salesman = 3,
    Buyer = 4,
    Guest = 5,
}

class User {
    readonly id: number;
    private readonly createdAt: Date;
    name: string;
    products: Product[] = [];
    comments: Comment[] = [];
    status: Status = Status.offline;
    role: Role;

    constructor(id: number, name: string, createdAt: Date, role: Role = Role.Guest) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.role = role;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getStatus(): Status {
        return this.status;
    }

    getRole(): Role {
        return this.role;
    }

    getProducts(): Product[] {
        return this.products;
    }

    getComments(): Comment[] {
        return this.comments;
    }

    setName(name: string): void {
        this.name = name;
    }

    setStatus(status: Status): void {
        this.status = status;
    }

    setRole(role: Role): void {
        this.role = role;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    addComment(comment: Comment): void {
        this.comments.push(comment);
    }
}

class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    getUsersByName(name: string): User[] {
        return this.users.filter(user => user.getName().toLowerCase().includes(name.toLowerCase()));
    }

    updateName(userId: number, newName: string): boolean {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.setName(newName);
            return true;
        }
        return false;
    }

    addProductByUserID(userId: number, product: Product): boolean {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.addProduct(product);
            return true;
        }
        return false;
    }

    addCommentByUserID(userId: number, comment: Comment): boolean {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.addComment(comment);
            return true;
        }
        return false;
    }
}

class Comment {
    readonly id: number;
    readonly user: User;
    readonly product: Product;
    content: string;
    rating: number;
    readonly createdAt: Date;

    constructor(id: number, user: User, product: Product, content: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new Error("Рейтинг должен быть от 0 до 5");
        }
        if (content.length < 4) {
            throw new Error("Комментарий должен быть не менее 4 символов");
        }
        this.id = id;
        this.user = user;
        this.product = product;
        this.content = content;
        this.rating = rating;
        this.createdAt = new Date();
    }

    setContent(content: string): void {
        if (content.length < 4) {
            throw new Error("Комментарий должен быть не менее 4 символов");
        }
        this.content = content;
    }

    setRating(rating: number): void {
        if (rating < 0 || rating > 5) {
            throw new Error("Рейтинг должен быть от 0 до 5");
        }
        this.rating = rating;
    }
}

class CommentService {
    private comments: Comment[] = [];

    addComment(comment: Comment): void {
        this.comments.push(comment);
    }

    getAllComments(): Comment[] {
        return this.comments;
    }

    updateComment(commentId: number, newContent: string): boolean {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.setContent(newContent);
            return true;
        }
        return false;
    }

    deleteComment(commentId: number): void {
        this.comments = this.comments.filter(c => c.id !== commentId);
    }

    getCommentsByUserName(userName: string): Comment[] {
        return this.comments.filter(c => c.user.getName().toLowerCase().includes(userName.toLowerCase()));
    }

    getCommentsByUserId(userId: number): Comment[] {
        return this.comments.filter(c => c.user.id === userId);
    }

    getCommentsByProductId(productId: number): Comment[] {
        return this.comments.filter(c => c.product.id === productId);
    }

    updateCommentRating(commentId: number, newRating: number): boolean {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.setRating(newRating);
            return true;
        }
        return false;
    }

    searchCommentsByKeyword(keyword: string): Comment[] {
        return this.comments.filter(c => c.content.toLowerCase().includes(keyword.toLowerCase()));
    }

    getCommentsByRatingForProduct(productId: number, rating: number): Comment[] {
        return this.comments.filter(c => c.product.id === productId && c.rating === rating);
    }

    getCommentsByAverageRatingForProduct(productId: number, minRating: number = 0, maxRating: number = 5): Comment[] {
        return this.comments.filter(c => c.product.id === productId && c.rating >= minRating && c.rating <= maxRating);
    }
}

class Product {
    id: number;
    name: string;
    price: number;
    category: string[];

    constructor(id: number, name: string, price: number, category: string[]) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class Electronics extends Product {
    brand: string;
    warrantyPeriod: number;

    constructor(id: number, name: string, price: number, brand: string, warrantyPeriod: number) {
        super(id, name, price, ["Electronics"]);
        this.brand = brand;
        this.warrantyPeriod = warrantyPeriod;
    }
}

class Clothing extends Product {
    size: string;
    material: string;

    constructor(id: number, name: string, price: number, size: string, material: string) {
        super(id, name, price, ["Clothing"]);
        this.size = size;
        this.material = material;
    }
}

class ProductService {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    updateProduct(productId: number, name?: string, price?: number): boolean {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            if (name) product.name = name;
            if (price !== undefined && price >= 0) product.price = price;
            return true;
        }
        return false;
    }

    deleteProduct(productId: number): void {
        this.products = this.products.filter(p => p.id !== productId);
    }

    findByCategory(categories: string[]): Product[] {
        return this.products.filter(p => p.category.some(c => categories.includes(c)));
    }

}
