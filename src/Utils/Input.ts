export class Input {
    private static instance: Input;

    state: object = {
        KeyW: KeyState,
        KeyD: KeyState,
        KeyS: KeyState,
        KeyA: KeyState,
        Space: KeyState
    }

    public static getInstance(): Input {
        if (! Input.instance) {
            Input.instance = new Input();
            Input.instance.registerKeyboardEvents();
        }

        return Input.instance;
    }

    private constructor() { }
    
    private registerKeyboardEvents() {
        document.body.addEventListener("keydown", e => this.press(e.code));
        document.body.addEventListener("keyup", e => this.release(e.code));
    }

    private press(code) {
        this.state[code] = KeyState.DOWN;
    }

    private release(code) {
        this.state[code] = KeyState.UP;
    }

    is_pressed(code) {
        return this.state[code] === KeyState.DOWN;
    }

    is_released(code) {
        return this.state[code] === KeyState.UP;
    }
}

enum KeyState {
    DOWN,
    UP
}