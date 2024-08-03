import Position from "../../src/position";
import Snake from "../../src/snake";

test("Snake", () => {
    const snake = new Snake({ name: "Snake", positions: [], direction: new Position({ x: 0, y: 0 }) });

    expect(snake).toBeInstanceOf(Snake);
    expect(snake).toHaveProperty("id");
    expect(snake.name).toBe("Snake");
    expect(snake.positions).toEqual([]);
    expect(snake.direction).toEqual(new Position({ x: 0, y: 0 }));
});

test("Snake with my own id", () => {
    const snake = new Snake({ name: "Snake", positions: [], direction: new Position({ x: 0, y: 0 }) }, "my-own-id");

    expect(snake).toBeInstanceOf(Snake);
    expect(snake.id).toBe("my-own-id");
    expect(snake.name).toBe("Snake");
    expect(snake.positions).toEqual([]);
    expect(snake.direction).toEqual(new Position({ x: 0, y: 0 }));
});

test("Snake with positions", () => {
    const snake = new Snake({
        name: "Snake",
        positions: [new Position({ x: 1, y: 1 })],
        direction: new Position({ x: 0, y: 0 }),
    });

    expect(snake).toBeInstanceOf(Snake);
    expect(snake.name).toBe("Snake");
    expect(snake.positions).toEqual([new Position({ x: 1, y: 1 })]);
    expect(snake.direction).toEqual(new Position({ x: 0, y: 0 }));
});

test("Snake update", () => {
    const snake = new Snake({
        name: "Snake",
        positions: [new Position({ x: 1, y: 1 })],
        direction: new Position({ x: 0, y: 1 }),
    });

    snake.update();

    expect(snake.positions).toEqual([new Position({ x: 1, y: 2 }), new Position({ x: 1, y: 1 })]);
});

test("Snake must not update without positions", () => {
    const snake = new Snake({ name: "Snake", positions: [], direction: new Position({ x: 0, y: 1 }) });

    snake.update();

    expect(snake.positions).toEqual([]);
});

test("Snake must grow", () => {
    const snake = new Snake({
        name: "Snake",
        positions: [new Position({ x: 1, y: 1 })],
        direction: new Position({ x: 0, y: 1 }),
    });

    snake.grow();

    expect(snake.positions).toEqual([new Position({ x: 1, y: 1 }), new Position({ x: 1, y: 1 })]);
});

test("Snake must not grow without position", () => {
    const snake = new Snake({
        name: "Snake",
        positions: [],
        direction: new Position({ x: 0, y: 1 }),
    });

    snake.grow();

    expect(snake.positions).toEqual([]);
});

test("Snake change direction", () => {
    const snake = new Snake({
        name: "Snake",
        positions: [new Position({ x: 1, y: 1 })],
        direction: new Position({ x: 0, y: 1 }),
    });

    snake.changeDirection(new Position({ x: 1, y: 0 }));

    expect(snake.direction).toEqual(new Position({ x: 1, y: 0 }));
});
