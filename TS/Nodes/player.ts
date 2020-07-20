import Creature from "./creature.js";
import Collectible from "./collectible.js";
import Camera from "../Services/CameraService.js";
import RenderService from "../Services/RenderService.js";
import Registry from "../registry.js";

class Player extends Creature {
    public Stamina: number;

    public Inventory: Array<Collectible | undefined>;

    public CONTROLS: object;

    constructor(Position: Array<number>, Size: number, Angle: number, Mass: number, MaxHealth: number, public MaxStamina: number, public camera ?: Camera | undefined) {
        super(Position, Size, Angle, Mass, MaxHealth);

        this.Vertices = new Array(7);
        for (let i = 0; i < 7; i++) {
            this.Vertices[i] = [Math.sin(2*Math.PI/7 * i + this.Angle), Math.cos(2*Math.PI/7 * i + this.Angle), 1];
        }

        this.MaxStamina = MaxStamina;
        this.Stamina = this.MaxStamina;

        this.Inventory = (new Array(10)).map((): undefined => {return undefined});
        this.CONTROLS = {
            UP: false as boolean,
            DOWN: false as boolean,
            LEFT: false as boolean,
            RIGHT: false as boolean
        };

        this.camera = camera;
    }

    public setCamera(camera: Camera | undefined): void {
        this.camera = camera;
    }

    public OnRenderUpdate(delta: number, activeCamera: Camera) {
        RenderService.RenderCreature(activeCamera, this, "#ffffff");

        if (this.camera) {
            Camera.FollowEntity(this.camera, this);
        }
    }
}

export default Player;