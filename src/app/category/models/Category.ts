export class Category {
    constructor(
        public authorId: string,
        public body: string,
        public card1: string,
        public card2: string,
        public card3: string,
        public card4: string,
        public card5: string,
        public card6: string,
        public card7: string,
        public card8: string,
        public homepageImageUrl: string,
        public id: string,
        public imageUrl: string,
        public name: string,
        public showCards: boolean,
        public slug: string,
        public updatedAt: number = Date.now(),
    ) {
    }
}
