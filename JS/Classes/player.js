import Creature from "./creature.js";
import Camera from "../Services/CameraService.js";
import RenderService from "../Services/RenderService.js";
class Player extends Creature {
    constructor(Position, Size, Angle, Mass, MaxHealth, MaxStamina, camera) {
        super(Position, Size, Angle, Mass, MaxHealth);
        this.MaxStamina = MaxStamina;
        this.camera = camera;
        this.Vertices = new Array(7);
        for (let i = 0; i < 7; i++) {
            this.Vertices[i] = [Math.sin(2 * Math.PI / 7 * i + this.Angle), Math.cos(2 * Math.PI / 7 * i + this.Angle), 1];
        }
        this.MaxStamina = MaxStamina;
        this.Stamina = this.MaxStamina;
        this.Inventory = (new Array(10)).map(() => { return undefined; });
        this.CONTROLS = {
            UP: false,
            DOWN: false,
            LEFT: false,
            RIGHT: false
        };
        this.camera = camera;
    }
    setCamera(camera) {
        this.camera = camera;
    }
    OnRenderUpdate(delta, activeCamera) {
        RenderService.RenderCreature(activeCamera, this, "#ffffff");
        if (this.camera) {
            Camera.FollowEntity(this.camera, this);
        }
    }
}
export default Player;
//# sourceMappingURL=player.js.map