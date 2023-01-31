import { Graphics, Point } from "pixi.js";
import { Bullet } from "./Bullet";
import { GameObject } from "./GameObject";
import { Input } from "../Utils/Input";

export class Ship extends Graphics implements GameObject {
    name: string = "ship";

    private speed: number = 2;
    private rotation_speed: number = 3;
    private input: Input;
    private shoot_timeout: number = .10; // fraction of seconds
    private shoot_timeout_timer: number = 0;

    constructor() {
        super();

        this.position = new Point(50, 50);
        this.input = Input.getInstance();

        this.draw();
    }

    draw() {
        this.beginFill(0xFFFFFF);
        this.drawPolygon(this.getTrianglePoints().map(v => v * 40 - 20));
        this.endFill();
    }

    moveForwards(delta: number) {
        this.position.x -= (Math.cos(this.rotation) * this.speed) * delta;
        this.position.y -= (Math.sin(this.rotation) * this.speed) * delta;
    }

    moveBackwards(delta: number) {
        this.position.x += (Math.cos(this.rotation) * this.speed) * delta;
        this.position.y += (Math.sin(this.rotation) * this.speed) * delta;
    }

    shoot() {
        this.parent.addChild(new Bullet(this.position, this.rotation));
    }

    update(delta: number) {
        this.shoot_timeout_timer += (1 / 60 * delta);

        if (this.shoot_timeout_timer > this.shoot_timeout) {
            if (this.input.is_pressed("Space")) {
                this.shoot();

                this.shoot_timeout_timer = 0;
            }
        }
        

        if (this.input.is_pressed("KeyA")) {
            this.angle -= this.rotation_speed * delta;
        } else if (this.input.is_pressed("KeyD")) {
            this.angle += this.rotation_speed * delta;
        }
    
        if (this.input.is_pressed("KeyW")) {
            this.moveForwards(delta);
        } else if (this.input.is_pressed("KeyS")) {
            this.moveBackwards(delta);
        }

        this.draw();
    }
    
    private getTrianglePoints() {
        return [
            0, .5, 1, 0, 1, 1
        ];
    }
}