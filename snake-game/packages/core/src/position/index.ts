import CreatePositionDto from "./create-position.dto";

export default class Position {
    public x: number;
    public y: number;

    constructor({ x, y }: CreatePositionDto) {
        this.x = x;
        this.y = y;
    }

    equals(position: Position): boolean {
        return this.x === position.x && this.y === position.y;
    }
}
