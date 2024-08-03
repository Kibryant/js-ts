import Position from "../position";

export default interface CreateSnakeDto {
    name: string;
    positions: Position[];
    direction: Position;
}
