import DestructionService from "./DestructionService.js";
import Creature from "../Nodes/creature.js";

class HealthService {
    public static Heal(Creature: Creature, amount: number) {
        Creature.Health += amount;
        Creature.Health = Math.min(Creature.MaxHealth, Creature.Health);
    }

    public static Damage(Creature: Creature, amount: number) {
        Creature.Health -= amount;

        if (Creature.Health <= 0) {
            DestructionService.Destroy(Creature);
        }
    }
}

export default HealthService;