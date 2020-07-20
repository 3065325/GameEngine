import { canvas } from "../canvas.js";
import Creature from "../Nodes/creature.js";
import TMatrix from "../Library/TMatrices.js";
import Player from "../Nodes/player.js";
import CollectionService from "./CollectionService.js";
import CollectionEnums from "../Enums/CollectionEnums.js";
import Entity from "../Nodes/entity.js";
import InputService from "./InputService.js";
import Registry from "../registry.js";

const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const PI = Math.PI;

CollectionService.addCollection(CollectionEnums.Cameras);

class Camera {
    public CFrame: Array<Array<number>>;
    public Scale: Array<number>;

    constructor(public Position: Array<number>, public Angle: number, public FOV: Array<number>) {
        this.FOV = FOV;
        this.Position = Position;
        this.Scale = [
            canvas.width/(2*this.Position[2]*tan(this.FOV[0]/2 * PI/180)), 
            canvas.height/(2*this.Position[2]*tan(this.FOV[1]/2 * PI/180))
        ];
        this.Angle = Angle * PI/180;

        this.CFrame = [
            [this.Scale[0]*cos(this.Angle), this.Scale[1]*sin(this.Angle), 0],
            [-this.Scale[0]*sin(this.Angle), this.Scale[1]*cos(this.Angle), 0],
            [-this.Scale[0]*this.Position[0], -this.Scale[1]*this.Position[1], 1]
        ];

        CollectionService.addInstance(this, CollectionEnums.Cameras);
    }
    
    public static Translate(camera: Camera, Translate: Array<number>) {
        camera.Position[0] += Translate[0];
        camera.Position[1] += Translate[1];

        camera.CFrame = TMatrix.multM([
            [1, 0, 0],
            [0, 1, 0],
            [-Translate[0]*camera.Scale[0], -Translate[1]*camera.Scale[1], 1]
        ], camera.CFrame);
    }

    public static Zoom(camera: Camera, Zoom: number) {
        camera.CFrame = TMatrix.multM([
            [(camera.Position[2] + Zoom)/camera.Position[2], 0, 0],
            [0, (camera.Position[2] + Zoom)/camera.Position[2], 0],
            [0, 0, 1]
        ], camera.CFrame);

        camera.Position[2] -= Zoom;
        camera.Scale = [
            canvas.width/(2*tan(camera.FOV[0]/2 * PI/180) * camera.Position[2]), // = canvas.width/(2*tan(camera.FOV[0]/2 * PI/180)) * 1/(camera.Position[2] - Zoom)
            canvas.height/(2*tan(camera.FOV[1]/2 * PI/180) * camera.Position[2])
        ];
    }

    public static Rotate(camera: Camera, Angle: number) {
        const AngleRad = -Angle * PI/180;

        camera.CFrame = TMatrix.multM([
            [cos(AngleRad), sin(AngleRad), 0],
            [-sin(AngleRad), cos(AngleRad), 0],
            [0, 0, 1]
        ], camera.CFrame);

        camera.Angle += Angle;
    }

    public static Transform(camera: Camera, Translate: Array<number>, Zoom: number, Rotate: number) {
        Camera.Translate(camera, Translate);
        Camera.Rotate(camera, Rotate);
        Camera.Zoom(camera, Zoom);
    }

    public static FollowEntity(camera: Camera, Entity: Entity) {
        const EntityPos = Entity.position();
        const TranslationalDiff = [(EntityPos[0]) - camera.Position[0], (EntityPos[1]) - camera.Position[1]];
        const RotationalDiff = Entity.Angle - camera.Angle;

        Camera.Rotate(camera, RotationalDiff);
        Camera.Translate(camera, TranslationalDiff);
    }
}

InputService.ConnectToScrollUp(() => {
    if (Registry.activeCamera) {
        Camera.Zoom(Registry.activeCamera, 10);
    }
});

InputService.ConnectToScrollDown(() => {
    if (Registry.activeCamera) {
        Camera.Zoom(Registry.activeCamera, -10);
    }
});

export default Camera;