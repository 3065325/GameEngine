import Entity from "./entity.js";
import RenderService from "../Services/RenderService.js";
class Creature extends Entity {
    constructor(Position, Radius, Angle, Mass, MaxHealth) {
        super(Position, Angle);
        this.Position = Position;
        this.Radius = Radius;
        this.Angle = Angle;
        this.Mass = Mass;
        this.MaxHealth = MaxHealth;
        this.CFrame = [
            [Radius, 0, 0],
            [0, Radius, 0],
            [Position[0], Position[1], 1]
        ];
        this.Mass = Mass;
        this.MaxHealth = MaxHealth;
        this.Health = MaxHealth;
    }
    radius() {
        return this.CFrame[0][0];
    }
    ApplyForce(Force) {
        const Acceleration = [Force[0] / this.Mass, Force[1] / this.Mass];
        this.Velocity[0] += Acceleration[0];
        this.Velocity[1] += Acceleration[1];
    }
    OnRenderUpdate(delta, activeCamera) {
        RenderService.RenderCreature(activeCamera, this, "#ffffff");
    }
}
export default Creature;
//# sourceMappingURL=creature.js.map