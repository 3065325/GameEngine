import CollisionObject from "./CollisionObject.js";
import CollectionService from "../Services/CollectionService.js";
import CollectionEnums from "../Enums/CollectionEnums.js";
CollectionService.addCollection(CollectionEnums.Areas);
class Area extends CollisionObject {
    constructor(Translation, Dilation, Rotation, Parent, Children) {
        super(Translation, Dilation, Rotation, Parent, Children);
        this.Translation = Translation;
        this.Dilation = Dilation;
        this.Rotation = Rotation;
        this.Parent = Parent;
        this.Children = Children;
        this.CollidingWith = [];
        this.Vertices = [
            [0.5, 0.5, 1],
            [-0.5, 0.5, 1],
            [-0.5, -0.5, 1],
            [0.5, -0.5, 1]
        ];
        CollectionService.addInstance(this, CollectionEnums.Areas);
    }
    OnPhysicsUpdate(delta) {
    }
}
export default Area;
//# sourceMappingURL=Area.js.map