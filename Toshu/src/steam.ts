enum StatusProduct {
    free = 1,
    paid,
    betaTest,
    limitedAccess,
}
enum Role {
    Gaben = 1,
    agentGabena,
    Admin,
    Moder,
    Player,
}
enum StatusUser {
    online = 1,
    offline,
    ban,
}

class User {
    private readonly steamID: number;
    private name: string;
    private login: string;
    private password: string;
    private library?: number[] = [];
    private friend?: number[] = [];
    private comment?: number[] = [];
    private status: StatusUser = StatusUser.online;
    private bansGame?: number[] = [];
    private 
    private VACBans: boolean = false;
    private communityBans: boolean = false;
    private tradeBan: boolean = false;
    private role:Role = Role.Player;

    constructor(steamID: number, name: string, login: string, password: string) {
        this.steamID = steamID;
        this.name = name;
        this.login = login;
        this.password = password;
    }

    getSteamID(): number {
        return this.steamID;
    }

    getName(): string {
        return this.name;
    }

    getLogin(): string {
        return this.login;
    }

    getPassword(): string {
        return this.password;
    }

    getLibrary(): number[] | undefined {
        return this.library;
    }

    getFriends(): number[] | undefined {
        return this.friend;
    }

    getComments(): number[] | undefined {
        return this.comment;
    }

    getStatus(): StatusUser {
        return this.status;
    }

    getBansGame(): number[] | undefined {
        return this.bansGame;
    }

    getRole(): Role | undefined {
        return this.role;
    }

    hasVACBan(): boolean {
        return this.VACBans;
    }

    hasCommunityBan(): boolean {
        return this.communityBans;
    }

    hasTradeBan(): boolean {
        return this.tradeBan;
    }

    setName(name: string): void {
        this.name = name;
    }

    setLogin(login: string): void {
        this.login = login;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setStatus(status: StatusUser): void {
        this.status = status;
    }

    setVACBan(value: boolean): void {
        this.VACBans = value;
    }

    setCommunityBan(value: boolean): void {
        this.communityBans = value;
    }

    setTradeBan(value: boolean): void {
        this.tradeBan = value;
    }

    setRole(value: Role): void {
        this.role = value;
    }

    addGameToLibrary(gameID: number): void {
        this.library?.push(gameID);
    }

    addFriend(friendID: number): void {
        this.friend?.push(friendID);
    }

    addComment(commentID: number): void {
        this.comment?.push(commentID);
    }

    addBanGame(gameID: number): void {
        this.bansGame?.push(gameID);
    }

    removeGameFromLibrary(gameID: number): void {
        this.library = this.library?.filter(id => id !== gameID);
    }

    removeFriend(friendID: number): void {
        this.friend = this.friend?.filter(id => id !== friendID);
    }

    removeComment(commentID: number): void {
        this.comment = this.comment?.filter(id => id !== commentID);
    }

    removeBanGame(gameID: number): void {
        this.bansGame = this.bansGame?.filter(id => id !== gameID);
    }
}

class Product {

}
