import Snake from "../snake";
import Bubble from "../bubble";
import Position from "../position";

export default class Game {
    private snakes: Snake[] = [];
    private bubbles: Bubble[] = [];

    // Adiciona um novo jogador
    addSnake(id: string, startPos: Position, startDir: Position): void {
        this.snakes.push(new Snake(id, [startPos], startDir));
    }

    // Adiciona uma bolinha
    addBubble(position: Position): void {
        this.bubbles.push(new Bubble(position));
    }

    // Atualiza o estado do jogo
    update(): void {
        for (const Snake of this.snakes) {
            Snake.update();
            this.checkCollisions(Snake);
        }
    }

    private checkCollisions(Snake: Snake): void {
        for (const bubble of this.bubbles) {
            if (Snake.hasCollided(bubble.position)) {
                Snake.grow();
                this.bubbles = this.bubbles.filter((b) => b !== bubble);
            }
        }

        for (const otherSnake of this.snakes) {
            if (otherSnake !== Snake && otherSnake.hasCollided(Snake.positions[0])) {
            }
        }

        // Checar colisão com as paredes
        // Lógica para checar se a posição do jogador está fora dos limites
    }
}
