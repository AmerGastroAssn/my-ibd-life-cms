export class Meta {
    constructor(
        public id: string,
        public metaDesc: string,
        public metaAuthor: string,
        public metaKeywords: string,
        public metaImageURL: string,
        public headerArea: string,
        public widgetSnippet: string,
        public seo?: string,
    ) {
    }
}
