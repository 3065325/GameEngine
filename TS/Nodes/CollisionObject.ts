import GameNode from "./GameNode.js";
import Spatial from "./Spatial.js";

class CollisionObject extends Spatial {
    constructor(public Translation: Array<number>, public Dilation: Array<number>, public Rotation: number, public Parent: GameNode, public Children ?: Array<GameNode>) {
        super(Translation, Dilation, Rotation, Parent, Children);
    }
}

export default CollisionObject;