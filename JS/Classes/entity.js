import CollectionService from "../Services/CollectionService.js";
import TMatrix from "../Library/TMatrices.js";
import CollectionEnums from "../Enums/CollectionEnums.js";
import Camera from "../Services/CameraService.js";
import InputService from "../Services/InputService.js";
import Registry from "../registry.js";
const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const PI = Math.PI;
CollectionService.addCollection(CollectionEnums.Entities);
class Entity {
    constructor(Position, Angle) {
        this.Position = Position;
        this.Angle = Angle;
        this.Velocity = [0, 0];
        this.Angle = Angle * Math.PI / 180;
        this.Vertices = [];
        this.CFrame = [
            [cos(-this.Angle), sin(-this.Angle), 0],
            [-sin(-this.Angle), cos(-this.Angle), 0],
            [-this.Position[0], -this.Position[1], 1]
        ];
        this.DVertices = [];
        CollectionService.addInstance(this, CollectionEnums.Entities);
    }
    dvertices() {
        this.DVertices = TMatrix.multM(this.CFrame, this.Vertices);
        return this.DVertices;
    }
    position() {
        return [this.CFrame[2][0], this.CFrame[2][1]];
    }
    ApplyVelocity(Velocity) {
        this.Velocity[0] += Velocity[0];
        this.Velocity[1] += Velocity[1];
    }
    ApplyMovements(delta) {
        const Translations = TMatrix.Translate([this.Velocity[0] * delta, this.Velocity[1] * delta]);
        const Rotation = TMatrix.RotateXY1(-this.Angle);
        const RTranslation = Translations;
        this.CFrame = TMatrix.multM(RTranslation, this.CFrame);
    }
    OnPhysicsUpdate(delta) {
        this.ApplyMovements(delta);
    }
    OnRenderUpdate(delta, activeCamera) {
    }
}
export default Entity;
InputService.ConnectToKeyDown(87, () => {
    if (Registry.activeCamera) {
        Camera.Translate(Registry.activeCamera, [0, 1 * Registry.m]);
    }
});
//# sourceMappingURL=entity.js.map