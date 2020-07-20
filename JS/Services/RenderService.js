import TMatrix from "../Library/TMatrices.js";
import { c } from "../canvas.js";
import Registry from "../registry.js";
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
class RenderService {
    static RenderPolygon(Camera, CFrame, Vertices, color, fill) {
        const CVertices = TMatrix.multM(Camera.CFrame, TMatrix.multM(CFrame, Vertices));
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
            c.fill();
        }
        ;
    }
    static RenderNormalPolygon(Camera, VertexCount, Position, Radius, InitAngle, color, fill) {
        const CFrame = [
            [Radius, 0, 0],
            [0, Radius, 0],
            [Position[0], Position[1], 1]
        ];
        const dA = 2 * Math.PI / VertexCount;
        const Vertices = new Array(VertexCount);
        for (let i = 0; i < VertexCount; i++) {
            Vertices[i] = [sin(dA * i - InitAngle * PI / 180), cos(dA * i - InitAngle * PI / 180), 1];
        }
        this.RenderPolygon(Camera, CFrame, Vertices, color, fill);
    }
    static RenderCreature(Camera, Creature, color) {
        c.strokeStyle = "#000000";
        c.fillStyle = color;
        this.RenderPolygon(Camera, Creature.CFrame, Creature.Vertices, color, true);
    }
    static setActiveCamera(Camera) {
        Registry.activeCamera = Camera;
    }
}
;
export default RenderService;
//# sourceMappingURL=RenderService.js.map