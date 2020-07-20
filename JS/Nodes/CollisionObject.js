import Spatial from "./Spatial.js";
class CollisionObject extends Spatial {
    constructor(Translation, Dilation, Rotation, Parent, Children) {
        super(Translation, Dilation, Rotation, Parent, Children);
        this.Translation = Translation;
        this.Dilation = Dilation;
        this.Rotation = Rotation;
        this.Parent = Parent;
        this.Children = Children;
    }
}
export default CollisionObject;
//# sourceMappingURL=CollisionObject.js.map