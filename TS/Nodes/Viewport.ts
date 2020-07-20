import GameNode from "./GameNode.js";
import Spatial from "./Spatial.js";

class Viewport extends Spatial {
    constructor(public Size: Array<number>, public Translation: Array<number>, public Rotation: number, Parent: GameNode, Children ?: Array<GameNode>) {
        super(Translation, Size, Rotation, Parent, Children);
    }
}

export default Viewport;