import { Graphics, Point } from "pixi.js";
import { GameObject } from "./GameObject";
import { APP_SIZE } from "../Utils/Constants";

export class Enemy extends Graphics implements GameObject {
    private speed: number = 1;
    size: EnemySize = EnemySize.SMALL;
    name: string = "enemy";

    constructor(spawn_position?: Point, spawn_size?: EnemySize) {
        super();

        this.position = spawn_position ? spawn_position : this.position;
        this.size = spawn_size ? spawn_size : this.size;

        this.addEventListener("added", e => {
            let ship_position = this.parent.getChildByName("ship").position
            this.rotation = Math.atan2(this.position.y - ship_position.y, this.position.x - ship_position.x);;
        });
    }

    update(delta: number) {
        if (this.position.x < 0 || this.position.y < 0) {
            this.destroy();
        } else if (this.position.x > APP_SIZE.x || this.position.y > APP_SIZE.y) {
            this.destroy();
        } else {
            this.position.x -= (Math.cos(this.rotation) * this.speed) * delta;
            this.position.y -= (Math.sin(this.rotation) * this.speed) * delta;
    
            this.draw();
        }
    }

    draw() {
        this.beginFill(0xFFFFFF);
        this.drawRect(-this.size/2, -this.size/2, this.size, this.size);
        this.endFill();
    }
}

export enum EnemySize {
    SMALL = 10,
    LARGE = 50
}