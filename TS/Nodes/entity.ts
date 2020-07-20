import CollectionService from "../Services/CollectionService.js";
import TMatrix from "../Library/TMatrices.js";
import CollectionEnums from "../Enums/CollectionEnums.js";
import Camera from "../Services/CameraService.js";
import RenderService from "../Services/RenderService.js";
import InputService from "../Services/InputService.js";
import Registry from "../registry.js";

const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const PI = Math.PI;

CollectionService.addCollection(CollectionEnums.Entities);

class Entity {
    public Velocity: Array<number>;
    public Vertices: Array<Array<number>>;
    public CFrame: Array<Array<number>>;
    public DVertices: Array<Array<number>>;

    constructor(public Position: Array<number>, public Angle: number) {
        this.Velocity = [0, 0];

        this.Angle = Angle * Math.PI/180;

        this.Vertices = [];
        this.CFrame = [
            [cos(-this.Angle), sin(-this.Angle), 0],
            [-sin(-this.Angle), cos(-this.Angle), 0],
            [-this.Position[0], -this.Position[1], 1]
        ];
        this.DVertices = [];

        CollectionService.addInstance(this, CollectionEnums.Entities);
    }

    public dvertices(): Array<Array<number>> {
        this.DVertices = TMatrix.multM(this.CFrame, this.Vertices);
        return this.DVertices
    }

    public position(): Array<number> {
        return [this.CFrame[2][0], this.CFrame[2][1]];
    }

    public ApplyVelocity(Velocity: Array<number>): void {
        this.Velocity[0] += Velocity[0];
        this.Velocity[1] += Velocity[1];
    }

    public ApplyMovements(delta: number): void {
        const Translations = TMatrix.Translate([this.Velocity[0]*delta, this.Velocity[1]*delta]);
        const Rotation = TMatrix.RotateXY1(-this.Angle);
        const RTranslation = Translations //TMatrix.multM(Rotation, Translations);

        // this.CFrame = TMatrix.multM(TMatrix.multM(Rotation, Translations), this.CFrame);
        this.CFrame = TMatrix.multM(RTranslation, this.CFrame);
    }

    public OnPhysicsUpdate(delta: number) {
        this.ApplyMovements(delta);
    }

    public OnRenderUpdate(delta: number, activeCamera: Camera) {
        
    }
}

export default Entity;

InputService.ConnectToKeyDown(87, () => {
    if (Registry.activeCamera) {
        Camera.Translate(Registry.activeCamera, [0, 1*Registry.m]);
    }
})