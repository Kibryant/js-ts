import Bubble from "../../src/bubble";
import Position from "../../src/position";

test("Bubble", () => {
    const bubble = new Bubble(new Position({ x: 0, y: 0 }));

    expect(bubble).toBeInstanceOf(Bubble);
    expect(bubble.positon.x).toBe(0);
    expect(bubble.positon.y).toBe(0);
});
