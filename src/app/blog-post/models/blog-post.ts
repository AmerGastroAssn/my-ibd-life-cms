export class BlogPost {
    constructor(
        public id: string,
        public orderNumber: number,
        public title: string,
        public body: string,
        public photoURL: string,
        public buttonString: string,
        public url: string,
        public updatedAt: any,
        public author: string,
        public isExtURL: boolean,
    ) {
    }
}
