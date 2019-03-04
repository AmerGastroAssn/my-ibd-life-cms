export class PressRelease {
    constructor(
        public author: string,
        public createdAt: number,
        public body: string,
        public sortOrder: number,
        public published: boolean,
        public publishOn: any,
        public summary: string,
        public title: string,
        public url: string,
        public updatedAt: number,
        public metaDesc: string,
        public id: string,
        public $key?: string,
        public uid?: string,
    ) {
    }
}
