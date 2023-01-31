import { Graphics, Point } from "pixi.js";
import { GameObject } from "./GameObject";
import { Enemy, EnemySize } from "./Enemy";
import { APP_SIZE } from "../Utils/Constants";

export class EnemySpawner extends Graphics implements GameObject {
    private spawn_timeout: number = 1; // fraction of seconds
    private spawn_timeout_timer: number = 0;
    private max_enemies: number = 5;
    name: string = "spawner";

    update(delta: number): void {
        this.spawn_timeout_timer += (1 / 60 * delta);

        if (this.spawn_timeout_timer > this.spawn_timeout) {
            this.spawn();
        }
    }

    spawn(spawn_size?: EnemySize, spawn_position?: Point) {
        if (this.parent.children.filter(c => c.name == "enemy").length + 1 <= this.max_enemies) {

            if (! spawn_position) {
                spawn_position = new Point(
                    Math.floor(Math.random() * (APP_SIZE.x - 0 + 1) + 0),
                    Math.floor(Math.random() * (APP_SIZE.y - 0 + 1) + 0)
                );
            }

            if (! spawn_size) {
                spawn_size = Math.random() < 0.5 ? EnemySize.SMALL : EnemySize.LARGE;
            }
            
            this.parent.addChild(new Enemy(spawn_position, spawn_size));
            this.spawn_timeout_timer = 0;
        }
    }
}