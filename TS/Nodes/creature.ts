import Entity from "./entity.js";
import Camera from "../Services/CameraService.js";
import RenderService from "../Services/RenderService.js";

class Creature extends Entity {
    public Health: number;

    constructor(public Position: Array<number>, public Radius: number, public Angle: number, public Mass: number, public MaxHealth: number) {
        super(Position, Angle);

        this.CFrame = [
            [Radius, 0, 0],
            [0, Radius, 0],
            [Position[0], Position[1], 1]
        ]

        this.Mass = Mass;

        this.MaxHealth = MaxHealth;
        this.Health = MaxHealth;
    }

    public radius(): number {
        return this.CFrame[0][0];
    }

    public ApplyForce(Force: Array<number>): void {
        const Acceleration = [Force[0]/this.Mass, Force[1]/this.Mass];
        
        this.Velocity[0] += Acceleration[0];
        this.Velocity[1] += Acceleration[1];
    }

    public OnRenderUpdate(delta: number, activeCamera: Camera) {
        RenderService.RenderCreature(activeCamera, this, "#ffffff")
    }
}

export default Creature;