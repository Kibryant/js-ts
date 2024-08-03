import Position from "../position";
import Entity from "../shared/entity";
import CreateSnakeDto from "./create-snake.dto";

export default class Snake extends Entity {
    public name: string;
    public positions: Position[];
    private _direction: Position;

    constructor({ name, positions, direction }: CreateSnakeDto, id?: string) {
        super(id);

        this.name = name;
        this.positions = positions;
        this._direction = direction;
    }

    get direction(): Position {
        return this._direction;
    }

    update(): void {
        const currentHead = this.positions[0];

        if (currentHead === undefined) return;

        const newHead = new Position({ x: currentHead.x + this.direction.x, y: currentHead.y + this.direction.y });

        this.positions.unshift(newHead);
    }

    changeDirection(direction: Position): void {
        this._direction = direction;
    }

    grow(): void {
        const lastPosition = this.positions[this.positions.length - 1];

        if (lastPosition === undefined) return;

        const newLastPosition = new Position({ x: lastPosition.x, y: lastPosition.y });

        this.positions.push(newLastPosition);
    }
}
