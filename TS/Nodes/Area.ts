import GameNode from "./GameNode.js";
import CollisionObject from "./CollisionObject.js";
import CollectionService from "../Services/CollectionService.js";
import CollectionEnums from "../Enums/CollectionEnums.js";

CollectionService.addCollection(CollectionEnums.Areas);

class Area extends CollisionObject {
    public CollidingWith: Array<Area>;
    public Vertices: Array<Array<number>>;

    constructor(public Translation: Array<number>, public Dilation: Array<number>, public Rotation: number, public Parent: GameNode, public Children ?: Array<GameNode>) {
        super(Translation, Dilation, Rotation, Parent, Children);

        this.CollidingWith = [];

        this.Vertices = [
            [0.5, 0.5, 1],
            [-0.5, 0.5, 1],
            [-0.5, -0.5, 1],
            [0.5, -0.5, 1]
        ];

        CollectionService.addInstance(this, CollectionEnums.Areas);
    }

    public OnPhysicsUpdate(delta: number) {

    }
}

export default Area;