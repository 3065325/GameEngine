import { CanvasUpdate } from "./canvas.js";
import RenderService from "./Services/RenderService.js";
import Registry from "./registry.js";
import Player from "./Nodes/player.js";
import Camera from "./Services/CameraService.js";
import CollectionService from "./Services/CollectionService.js";
let P = new Player([0, 0], 10, -90, 160, 100, 100);
let C = new Camera([...P.position(), 10 * Registry.m], 0, [129, 90]);
P.camera = C;
RenderService.setActiveCamera(P.camera);
P.ApplyVelocity([0, 0]);
let t = 0.001;
const RenderLoop = setInterval(() => {
    CanvasUpdate(true, "#000011");
    if (Registry.activeCamera !== undefined) {
        let Collections = CollectionService.getCollections();
        for (let i = 0; i < Collections.length; i++) {
            let Collection = Collections[i];
            if (!Collection) {
                continue;
            }
            ;
            for (let j = 0; j < Collection.length; j++) {
                let Member = Collection[j];
                if (!Member || !Member.OnRenderUpdate) {
                    continue;
                }
                ;
                Member.OnRenderUpdate(Registry.renderDelta, Registry.activeCamera);
            }
        }
    }
    else {
        console.log("No Active Camera to render by.");
    }
    if (Registry.activeCamera) {
        RenderService.RenderNormalPolygon(Registry.activeCamera, 6, [10 * Registry.m, 10 * Registry.m], 7 * Registry.m, 0, "#7777ff", true);
        RenderService.RenderNormalPolygon(Registry.activeCamera, 7, [-10 * Registry.m, 0 * Registry.m], 5 * Registry.m, 0, "#ff7777", true);
        RenderService.RenderNormalPolygon(Registry.activeCamera, 5, [0 * Registry.m, -10 * Registry.m], 6 * Registry.m, 0, "#77ff77", true);
    }
}, Registry.renderDelta);
//# sourceMappingURL=render.js.map