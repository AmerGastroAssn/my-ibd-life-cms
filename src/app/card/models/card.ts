export class Card {
    constructor(
        public author: string,
        public id: string,
        public imageUrl: string,
        public isExtUrl: boolean,
        public url: string,
        public orderNumber: number,
        public title: string,
        public updatedAt: number = Date.now(),
    ) {
    }
}
