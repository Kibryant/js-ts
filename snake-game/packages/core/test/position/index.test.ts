import Position from "../../src/position";

test("Position", () => {
    const position = new Position({ x: 1, y: 1 });

    expect(position).toBeInstanceOf(Position);
    expect(position.x).toBe(1);
    expect(position.y).toBe(1);
});

test("Position equals", () => {
    const position = new Position({ x: 1, y: 1 });

    expect(position.equals(new Position({ x: 1, y: 1 }))).toBe(true);
    expect(position.equals(new Position({ x: 2, y: 1 }))).toBe(false);
    expect(position.equals(new Position({ x: 1, y: 2 }))).toBe(false);
});
