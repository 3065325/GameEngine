import GameNode from "./GameNode.js";
import TMatrix from "../Library/TMatrices.js";

const cos = Math.cos;
const sin = Math.sin;
const PI = Math.PI;

class Spatial extends GameNode {
    public LocalTransform: Array<Array<number>>;
    public GlobalTransform: Array<Array<number>>;

    constructor(public Translation: Array<number>, public Dilation: Array<number>, public Rotation: number, public Parent: GameNode, public Children ?: Array<GameNode>) {
        super(Parent, Children);

        this.Translation = Translation;
        this.Dilation = Dilation;
        this.Rotation = Rotation;

        const xTran: number = Translation[0];
        const yTran: number = Translation[1];
        const xDil: number = Dilation[0];
        const yDil: number = Dilation[1];
        const xRot: number = cos(this.Rotation);
        const yRot: number = sin(this.Rotation);

        this.GlobalTransform = [
            [xDil*xRot, yDil*yRot, 0],
            [-xDil*yRot, yDil*xRot, 0],
            [xDil*xTran, yDil*yTran, 1]
        ];

        this.LocalTransform = this.Parent instanceof(Spatial) ? TMatrix.multM(this.Parent.LocalTransform, this.GlobalTransform) : this.GlobalTransform;
    }

    public Translate(Vector: Array<number>): void {
        this.GlobalTransform = TMatrix.multM(TMatrix.Translate([...Vector, 1]), this.GlobalTransform);

        this.LocalTransform = this.Parent instanceof(Spatial) ? TMatrix.multM(this.Parent.LocalTransform, this.GlobalTransform) : this.GlobalTransform;
    }
}

export default Spatial;