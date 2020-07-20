import GameNode from "./GameNode.js";
import TMatrix from "../Library/TMatrices.js";
const cos = Math.cos;
const sin = Math.sin;
const PI = Math.PI;
class Spatial extends GameNode {
    constructor(Translation, Dilation, Rotation, Parent, Children) {
        super(Parent, Children);
        this.Translation = Translation;
        this.Dilation = Dilation;
        this.Rotation = Rotation;
        this.Parent = Parent;
        this.Children = Children;
        this.Translation = Translation;
        this.Dilation = Dilation;
        this.Rotation = Rotation;
        const xTran = Translation[0];
        const yTran = Translation[1];
        const xDil = Dilation[0];
        const yDil = Dilation[1];
        const xRot = cos(this.Rotation);
        const yRot = sin(this.Rotation);
        this.GlobalTransform = [
            [xDil * xRot, yDil * yRot, 0],
            [-xDil * yRot, yDil * xRot, 0],
            [xDil * xTran, yDil * yTran, 1]
        ];
        this.LocalTransform = this.Parent instanceof (Spatial) ? TMatrix.multM(this.Parent.LocalTransform, this.GlobalTransform) : this.GlobalTransform;
    }
}
export default Spatial;
//# sourceMappingURL=Spatial.js.map