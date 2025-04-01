export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public email_verified: boolean = false,
        public id?: string,
    ) { }
}
