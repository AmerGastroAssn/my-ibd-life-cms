export class Page {
    constructor(
        public author: string,
        public bannerPhotoURL: string,
        public callToAction: string,
        public cardOption1: string,
        public cardOption2: string,
        public cardOption3: string,
        public contentSectionBottom: string,
        public cardSectionTitle: string,
        public contentSectionTop: string,
        public category: string,
        public date: number,
        public extURL: string,
        public grandchildURL: string,
        public hasCards: boolean,
        public hidden: boolean,
        public id: string,
        public isExtURL: boolean,
        public isGrandchildPage: boolean,
        public metaDesc: string,
        public photoURL: string,
        public published: boolean,
        public showWidgetSnippet: boolean,
        public sortOrder: number,
        public slug: string,
        public template: string,
        public title: string,
        public updatedAt: number,
        public url: string,
    ) {
    }
}
