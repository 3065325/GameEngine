import Camera from "./Services/CameraService.js";

const Registry = {
    GAMESTATE: 0 as number,
    renderDelta: 1/60 as number,
    physicsDelta: 1/60 as number,
    activeCamera: undefined as Camera | undefined,
    m: 1 as number
};

export default Registry;