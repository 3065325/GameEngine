import TMatrix from "../Library/TMatrices.js";
import Camera from "./CameraService.js";
import Creature from "../Nodes/creature.js";
import { c } from "../canvas.js";
import Registry from "../registry.js";

const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;

class RenderService {
    public static RenderPolygon(Camera: Camera, CFrame: Array<Array<number>>, Vertices: Array<Array<number>>, color: string, fill: boolean): void {
        const CVertices: Array<Array<number>> = TMatrix.multM(Camera.CFrame, TMatrix.multM(CFrame, Vertices));

        c.beginPath();
        c.strokeStyle = color;
        c.fillStyle = color;
        c.lineWidth = 1;

        let CVertex = CVertices[0];

        c.moveTo(CVertex[0], -CVertex[1]);
        for (let i = 1; i < CVertices.length; i++) {
            CVertex = CVertices[i];

            c.lineTo(CVertex[0], -CVertex[1]);
        }
        c.closePath();
        c.stroke();
        if (fill) {
            c.fill()
        };
    }

    public static RenderNormalPolygon(Camera: Camera, VertexCount: number, Position: Array<number>, Radius: number, InitAngle: number, color: string, fill: boolean): void {
        const CFrame = [
            [Radius, 0, 0],
            [0, Radius, 0],
            [Position[0], Position[1], 1]
        ];

        const dA = 2*Math.PI/VertexCount;

        const Vertices: Array<Array<number>> = new Array(VertexCount);
        for (let i = 0; i < VertexCount; i++) {
            Vertices[i] = [sin(dA * i - InitAngle * PI/180), cos(dA * i - InitAngle * PI/180), 1];
        }

        this.RenderPolygon(Camera, CFrame, Vertices, color, fill);
    }

    public static RenderCreature(Camera: Camera, Creature: Creature, color: string): void {
        c.strokeStyle = "#000000";
        c.fillStyle = color;

        this.RenderPolygon(Camera, Creature.CFrame, Creature.Vertices, color, true);

        // if (Creature.Health !== Creature.MaxHealth) {
        //     const pos = Creature.position();
        //     const radius = Creature.radius();
        //     c.fillStyle = "#000000";
        //     c.fillRect(pos[0] - radius, pos[1] - radius/5, 2*radius, radius/2.5);
        //     c.fillStyle = "#c64545";
        //     c.fillRect(pos[0] - radius, pos[1] - radius/5, 2*radius * Creature.Health / Creature.MaxHealth, radius/2.5);
        // }
    }

    public static setActiveCamera(Camera: Camera) {
        Registry.activeCamera = Camera;
    }
};

export default RenderService;