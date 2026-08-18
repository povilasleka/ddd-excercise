export class Dimensions {
    public constructor(
        private readonly width: number,
        private readonly height: number,
    ) {}

    getWidth = () => this.width;
    getHeight = () => this.height;
}