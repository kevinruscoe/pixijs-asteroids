import { Graphics, Point } from "pixi.js";
import { GameObject } from "./GameObject";
import { APP_SIZE } from "../Utils/Constants";
import { EnemySize } from "./Enemy";

export class Bullet extends Graphics implements GameObject {
    private speed: number = 20;

    constructor(position: Point, rotation: number) {
        super();

        this.position = position;
        this.rotation = rotation;
    }

    update(delta: number) {
        if (this.position.x < 0 || this.position.y < 0) {
            this.destroy();
        } else if (this.position.x > APP_SIZE.x || this.position.y > APP_SIZE.y) {
            this.destroy();
        } else {
            this.parent.children.filter(e => e.name == "enemy").forEach(e => {
                if (this.getBounds().intersects(e.getBounds())) {
                    if (e.size == EnemySize.LARGE) {
                        let spawner = this.parent.getChildByName("spawner")

                        let spawn_postion_a = e.position.clone();
                        spawn_postion_a.x += Math.floor(Math.random() * (100 + 1) + 0);
                        spawn_postion_a.y += Math.floor(Math.random() * (100 + 1) + 0);
                        
                        spawner.spawn(
                            EnemySize.SMALL, spawn_postion_a
                        );

                        let spawn_postion_b = e.position.clone();
                        spawn_postion_b.x += Math.floor(Math.random() * (100 + 1) + 0);
                        spawn_postion_b.y += Math.floor(Math.random() * (100 + 1) + 0);

                        spawner.spawn(
                            EnemySize.SMALL, spawn_postion_b
                        );
                    }

                    e.destroy();
                    // this.destroy();
                }
            });

            this.position.x -= (Math.cos(this.rotation) * this.speed) * delta;
            this.position.y -= (Math.sin(this.rotation) * this.speed) * delta;
    
            this.draw();

            
        }
    }

    draw() {
        this.beginFill(0xFFFFFF);
        this.drawRect(-2.5, -2.5, 5, 5);
        this.endFill();
    }
}