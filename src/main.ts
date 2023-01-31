import * as PIXI from 'pixi.js';
import { APP_SIZE } from './Utils/Constants';
import { Ship } from './Entities/Ship';
import { EnemySpawner } from './Entities/EnemySpawner';

let app = new PIXI.Application({ width: APP_SIZE.x, height: APP_SIZE.y });
document.body.appendChild(app.view);

app.stage.addChild(new Ship);
app.stage.addChild(new EnemySpawner);

app.ticker.add(time => {
    app.stage.children.forEach(child => {
        child.update(time);
    });
});