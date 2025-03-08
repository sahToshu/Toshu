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
    private readonly id: number;
    private readonly createdAt: Date;
    private name: string;
    private productsID: number[] = [];
    private commentsID: number[] = [];
    private status: Status = Status.offline;
    private role: Role;

    constructor(id: number, name: string, createdAt: Date, role: Role = Role.Guest) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.role = role;
    }

    getId(): number {
        return this.id;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getName(): string {
        return this.name;
    }

    getProductsID(): number[] {
        return this.productsID;
    }

    getCommentsID(): number[] {
        return this.commentsID;
    }

    getStatus(): Status {
        return this.status;
    }

    getRole(): Role {
        return this.role;
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
    
    addComment(commentID: number): void {
        this.commentsID.push(commentID)
    }

    delComment(commentID: number): void {
        this.commentsID.filter(c => c !== commentID)
    }

    addProduct(productID: number): void {
        this.productsID.push(productID)
    }

    delProduct(productID: number): void {
        this.commentsID.filter(p => p !== productID)
    }
}

class Product {
    private readonly id: number;
    private userID: number;
    private name: string;
    private price: number;
    private category: string[] = [];
    private commentsID: number[] = [];

    constructor(id: number, userID: number, name: string, price: number, category: string[]) {
        this.id = id;
        this.userID = userID;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    getId(): number {
        return this.id;
    }

    getUserID(): number {
        return this.userID;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getCategory(): string[] {
        return this.category;
    }

    getCommentsID(): number[] {
        return this.commentsID;
    }

    setUserID(userID: number): void {
        this.userID = userID;
    }

    setName(name: string): void {
        this.name = name;
    }

    setPrice(price: number): void {
        if (price >= 0) {
            this.price = price;
        } else {
            throw new Error("Price must be non-negative");
        }
    }

    setCategory(category: string[]): void {
        this.category = category;
    }
}

class Comment {
    private readonly id: number;
    private userID: number;
    private productID: number;
    private content: string;
    private rating: number;
    private readonly createdAt: Date;

    constructor(id: number, userID: number, productID: number, content: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new Error("Rating must be between 0 and 5");
        }
        if (content.length < 4) {
            throw new Error("Content must be at least 4 characters long");
        }
        this.id = id;
        this.userID = userID;
        this.productID = productID;
        this.content = content;
        this.rating = rating;
        this.createdAt = new Date();
    }

    getId(): number {
        return this.id;
    }

    getUserID(): number {
        return this.userID;
    }

    getProductID(): number {
        return this.productID;
    }

    getContent(): string {
        return this.content;
    }

    getRating(): number {
        return this.rating;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }
    setContent(con:string):void {
        this.content = con
    }
    setRatind(rat: number): void {
        this.rating = rat
    }
}

class UserService {
    private users: User[] = [];

    addUser(user: User): boolean {
        this.users.push(user);
        return true;
    }

    getUsersByName(name: string): User[] {
        return this.users.filter(user => user.getName().toLowerCase().includes(name.toLowerCase()));
    }

    getUserByID(ID: number): User | undefined {
        return this.users.find(user => user.getId() === ID);
    }

    updateUser(userID: number, name?: string, status?: Status, role?: Role): boolean {
        const user = this.getUserByID(userID);
        if (!user) return false;
    
        if (name !== undefined) user.setName(name);
        if (status !== undefined) user.setStatus(status);
        if (role !== undefined) user.setRole(role);

        return true;
    }
    deleteUser(userID: number): boolean {
        const index = this.users.findIndex(user => user.getId() === userID);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
    
}

class ProductService {
    private products: Product[] = [];

    addProduct(product: Product): boolean {
        this.products.push(product);
        return true;
    }
    getProduct(productID: number) {
        return this.products.find(p => p.getId() === productID)
    }
    getAllProducts(): Product[] {
        return this.products;
    }

    getProductsByUserId(userId: number): Product[] {
        return this.products.filter(p => p.getUserID() === userId);
    }

    findByCategory(categories: string[]): Product[] {
        return this.products.filter(p => p.getCategory().some(c => categories.includes(c)));
    }

    updateProduct(productID: number, name?: string, price?: number): boolean {
        const product = this.getProduct(productID);
        if (!product) return false;
    
        if (name !== undefined) product.setName(name);
        if (price !== undefined) product.setPrice(price);

        return true;
    }
    deleteProduct(productID: number): boolean {
        const index = this.products.findIndex(p => p.getId() === productID);
        if (index === -1) return false;
        this.products.splice(index, 1);
        return true;
    }
}

class CommentService {
    private comments: Comment[] = [];

    addComment(comment: Comment): boolean {
        this.comments.push(comment);
        return true;
    }

    getComment(commentID: number): Comment | undefined {
        return this.comments.find(c => c.getId() === commentID);
    }

    getAllComments(): Comment[] {
        return this.comments;
    }

    getCommentsByUserId(userId: number): Comment[] {
        return this.comments.filter(c => c.getUserID() === userId);
    }

    getCommentsByProductId(productId: number): Comment[] {
        return this.comments.filter(c => c.getProductID() === productId);
    }

    updateComment(commentID: number, content?: string, rating?: number): boolean {
        const comment = this.getComment(commentID);
        if (!comment) return false;
    
        if (content !== undefined) comment.setContent(content);
        if (rating !== undefined) comment.setRatind(rating);

        return true;
    }

    deleteComment(commentID: number): boolean {
        const index = this.comments.findIndex(c => c.getId() === commentID);
        if (index === -1) return false;
        this.comments.splice(index, 1);
        return true;
    }
}
