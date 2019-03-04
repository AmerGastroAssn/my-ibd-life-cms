export class User {
    constructor(
        public uid: string,
        public email: string,
        public isOnline: boolean,
        public loginDate: number = Date.now(),
        public photoURL: string,
        public admin: boolean,
        public title: string,
        public displayName: string,
        public password?: string,
        public $key?: string,
    ) {
    }
}
