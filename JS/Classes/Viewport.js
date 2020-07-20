import Spatial from "./Spatial.js";
class Viewport extends Spatial {
    constructor(Size, Translation, Rotation, Parent, Children) {
        super(Translation, Size, Rotation, Parent, Children);
        this.Size = Size;
        this.Translation = Translation;
        this.Rotation = Rotation;
    }
}
export default Viewport;
//# sourceMappingURL=Viewport.js.map