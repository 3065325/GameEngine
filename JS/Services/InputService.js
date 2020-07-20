function indexCheck(Event) {
    if (!Event) {
        Event = [];
    }
    return Event;
}
function loopEventConnections(Event) {
    for (let i = 0; i < Event.length; i++) {
        const EventConnection = Event[i];
        EventConnection.func(...EventConnection.args);
    }
}
const KeyDownConnections = [];
const KeyUpConnections = [];
const KeyPressConnections = [];
const MouseDownConnections = [];
const MouseUpConnections = [];
const ScrollUpConnections = [];
const ScrollDownConnections = [];
class InputService {
    static ConnectToKeyEvent(Event, keyCode, func, args) {
        let FoundConnection = Event[keyCode];
        FoundConnection = indexCheck(FoundConnection);
        const Bundle = {
            func: func,
            args: args ? args : []
        };
        FoundConnection.push(Bundle);
        return Bundle;
    }
    static DisconnectFromKeyEvent(Event, keyCode, bundle) {
        let FoundConnection = Event[keyCode];
        FoundConnection = indexCheck(FoundConnection);
        FoundConnection.splice(FoundConnection.indexOf(bundle), 1);
    }
    static ConnectToMouseEvent(Event, func, args) {
        let FoundConnection = Event;
        const Bundle = {
            func: func,
            args: args ? args : []
        };
        FoundConnection.push(Bundle);
    }
    static DisconnectFromMouseEvent(Event, bundle) {
        let FoundConnection = Event;
        FoundConnection.splice(FoundConnection.indexOf(bundle), 1);
    }
    static ConnectToKeyDown(keyCode, func, args) {
        InputService.ConnectToKeyEvent(KeyDownConnections, keyCode, func, args);
    }
    static DisconnectFromKeyDown(keyCode, bundle) {
        InputService.DisconnectFromKeyEvent(KeyDownConnections, keyCode, bundle);
    }
    static ConnectToKeyUp(keyCode, func, args) {
        InputService.ConnectToKeyEvent(KeyUpConnections, keyCode, func, args);
    }
    static DisconnectFromKeyUp(keyCode, bundle) {
        InputService.DisconnectFromKeyEvent(KeyUpConnections, keyCode, bundle);
    }
    static ConnectToKeyPress(keyCode, func, args) {
        InputService.ConnectToKeyEvent(KeyPressConnections, keyCode, func, args);
    }
    static DisconnectFromKeyPress(keyCode, bundle) {
        InputService.DisconnectFromKeyEvent(KeyPressConnections, keyCode, bundle);
    }
    static ConnectToMouseDown(func, args) {
        InputService.ConnectToMouseEvent(MouseDownConnections, func, args);
    }
    static DisconnectFromMouseDown(bundle) {
        InputService.DisconnectFromMouseEvent(MouseDownConnections, bundle);
    }
    static ConnectToMouseUp(func, args) {
        InputService.ConnectToMouseEvent(MouseDownConnections, func, args);
    }
    static DisconnectFromMouseUp(bundle) {
        InputService.DisconnectFromMouseEvent(MouseUpConnections, bundle);
    }
    static ConnectToScrollUp(func, args) {
        InputService.ConnectToMouseEvent(ScrollUpConnections, func, args);
    }
    static DisconnectFromScrollUp(bundle) {
        InputService.DisconnectFromMouseEvent(ScrollUpConnections, bundle);
    }
    static ConnectToScrollDown(func, args) {
        InputService.ConnectToMouseEvent(ScrollDownConnections, func, args);
    }
    static DisconnectFromScrollDown(bundle) {
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
    FoundConnection = indexCheck(FoundConnection);
    loopEventConnections(FoundConnection);
});
window.addEventListener("keypress", (e) => {
    let FoundConnection = KeyPressConnections[e.keyCode];
    FoundConnection = indexCheck(FoundConnection);
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
//# sourceMappingURL=InputService.js.map