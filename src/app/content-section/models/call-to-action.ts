import { User } from '../../user/modals/user';

export class CallToAction {
    constructor(
        public author: User,
        public body: string,
        public buttonUrl: string,
        public buttonText: string,
        public createdAt: number,
        public id: string,
        public imageUrl: string,
        public isExtUrl: boolean,
        public name: string,
        public published: boolean,
        public subtitle: string,
        public updatedAt: number,
        public title: string,
        public value: string,
        public videoUrl: string,
    ) {
    }
}
