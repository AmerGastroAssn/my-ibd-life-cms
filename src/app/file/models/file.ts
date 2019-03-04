export class File {
    constructor(
        public $key: string,
        public author: string,
        public createdAt: number,
        public fileName: string,
        public fileType: string,
        public category: string,
        public uid: string,
        public url: string,
    ) {
    }
}
