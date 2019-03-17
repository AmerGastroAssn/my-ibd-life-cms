import { User } from '../../user/modals/user';

export class Homepage {
    constructor(
        public author: User,
        public id: string,
        public sec1Title: string,
        public sec1Subtitle: string,
        public sec1ImageUrl: string,
        public sec2TextLeft: string,
        public sec2TextRight: string,
        public sec3Title: string,
        public sec3CardLeftTitle: string,
        public sec3CardMiddleTitle: string,
        public sec3CardRightTitle: string,
        public sec3CardLeftImageUrl: string,
        public sec3CardMiddleImageUrl: string,
        public sec3CardRightImageUrl: string,
        public sec3Subtitle: string,
        public sec3Text: string,
        public sec3CatLeft: string,
        public sec3CatRight: string,
        public sec4ImageUrl: string,
        public sec4Title: string,
        public sec4Text: string,
        public updatedAt: number,
    ) {
    }
}
