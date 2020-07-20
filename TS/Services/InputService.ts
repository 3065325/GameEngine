interface Bundle {
    func: Function,
    args: Array<any>
}

function indexCheck(Event: Array<Bundle>): Array<Bundle> {
    if (!Event) {
        Event = [];
    }
    return Event;
}

function loopEventConnections(Event: Array<Bundle>) {
    for (let i = 0; i < Event.length; i++) {
        const EventConnection = Event[i];
        EventConnection.func(...EventConnection.args);
    }
}

const KeyDownConnections: Array<Array<Bundle>> = [];
const KeyUpConnections: Array<Array<Bundle>> = [];
const KeyPressConnections: Array<Array<Bundle>> = [];

const MouseDownConnections: Array<Bundle> = [];
const MouseUpConnections: Array<Bundle> = [];

const ScrollUpConnections: Array<Bundle> = [];
const ScrollDownConnections: Array<Bundle> = [];

class InputService {
    private static ConnectToKeyEvent(Event: Array<Array<Bundle>>, keyCode: number, func: Function, args ?: Array<any>): Bundle {
        let FoundConnection = Event[keyCode];
        FoundConnection = indexCheck(FoundConnection);

        const Bundle: Bundle = {
            func: func,
            args: args ? args : []
        }

        FoundConnection.push(Bundle);

        return Bundle;
    }

    private static DisconnectFromKeyEvent(Event: Array<Array<Bundle>>, keyCode: number, bundle: Bundle) {
        let FoundConnection = Event[keyCode];
        FoundConnection = indexCheck(FoundConnection);

        FoundConnection.splice(FoundConnection.indexOf(bundle), 1);
    }

    private static ConnectToMouseEvent(Event: Array<Bundle>, func: Function, args ?: Array<any>) {
        let FoundConnection = Event;

        const Bundle: Bundle = {
            func: func,
            args: args ? args : []
        }

        FoundConnection.push(Bundle);
    }

    private static DisconnectFromMouseEvent(Event: Array<Bundle>, bundle: Bundle) {
        let FoundConnection = Event;
        
        FoundConnection.splice(FoundConnection.indexOf(bundle), 1);
    }

    public static ConnectToKeyDown(keyCode: number, func: Function, args ?: Array<any>) {
        InputService.ConnectToKeyEvent(KeyDownConnections, keyCode, func, args);
    }

    public static DisconnectFromKeyDown(keyCode: number, bundle: Bundle) {
        InputService.DisconnectFromKeyEvent(KeyDownConnections, keyCode, bundle);
    }

    public static ConnectToKeyUp(keyCode: number, func: Function, args ?: Array<any>) {
        InputService.ConnectToKeyEvent(KeyUpConnections, keyCode, func, args);
    }

    public static DisconnectFromKeyUp(keyCode: number, bundle: Bundle) {
        InputService.DisconnectFromKeyEvent(KeyUpConnections, keyCode, bundle);
    }

    public static ConnectToKeyPress(keyCode: number, func: Function, args ?: Array<any>) {
        InputService.ConnectToKeyEvent(KeyPressConnections, keyCode, func, args);
    }

    public static DisconnectFromKeyPress(keyCode: number, bundle: Bundle) {
        InputService.DisconnectFromKeyEvent(KeyPressConnections, keyCode, bundle);
    }

    public static ConnectToMouseDown(func: Function, args ?: Array<any>) {
        InputService.ConnectToMouseEvent(MouseDownConnections, func, args);
    }

    public static DisconnectFromMouseDown(bundle: Bundle) {
        InputService.DisconnectFromMouseEvent(MouseDownConnections, bundle);
    }

    public static ConnectToMouseUp(func: Function, args ?: Array<any>) {
        InputService.ConnectToMouseEvent(MouseDownConnections, func, args);
    }

    public static DisconnectFromMouseUp(bundle: Bundle) {
        InputService.DisconnectFromMouseEvent(MouseUpConnections, bundle);
    }

    public static ConnectToScrollUp(func: Function, args ?: Array<any>) {
        InputService.ConnectToMouseEvent(ScrollUpConnections, func, args);
    }

    public static DisconnectFromScrollUp(bundle: Bundle) {
        InputService.DisconnectFromMouseEvent(ScrollUpConnections, bundle);
    }

    public static ConnectToScrollDown(func: Function, args ?: Array<any>) {
        InputService.ConnectToMouseEvent(ScrollDownConnections, func, args);
    }

    public static DisconnectFromScrollDown(bundle: Bundle) {
        InputService.DisconnectFromMouseEvent(ScrollDownConnections, bundle);
    }
}

window.addEventListener("keydown", (e) => {
    let FoundConnection = KeyDownConnections[e.keyCode];
    
    FoundConnection = indexCheck(FoundConnection);

    loopEventConnections(FoundConnection);
});

window.addEventListener("keyup", (e) => {
    let FoundConnection = KeyUpConnections[e.keyCode];

    FoundConnection = indexCheck(FoundConnection)
    loopEventConnections(FoundConnection);
});

window.addEventListener("keypress", (e) => {
    let FoundConnection = KeyPressConnections[e.keyCode];

    FoundConnection = indexCheck(FoundConnection)
    loopEventConnections(FoundConnection);
});

window.addEventListener("mousedown", () => {
    let FoundConnection = MouseDownConnections;

    loopEventConnections(FoundConnection);
});

window.addEventListener("mouseup", () => {
    let FoundConnection = MouseUpConnections;

    loopEventConnections(FoundConnection);
});

window.addEventListener("wheel", (e) => {
    if (e.deltaY === 0) {
        return;
    }

    let FoundConnection = e.deltaY < 0 ? ScrollUpConnections : ScrollDownConnections;

    loopEventConnections(FoundConnection);
});


export default InputService;