import DestructionService from "./DestructionService.js";
class HealthService {
    static Heal(Creature, amount) {
        Creature.Health += amount;
        Creature.Health = Math.min(Creature.MaxHealth, Creature.Health);
    }
    static Damage(Creature, amount) {
        Creature.Health -= amount;
        if (Creature.Health <= 0) {
            DestructionService.Destroy(Creature);
        }
    }
}
export default HealthService;
//# sourceMappingURL=HealthService.js.map