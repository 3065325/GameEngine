import Entity from "../Nodes/entity.js";
import CollectionService from "./CollectionService.js";
import CollectionEnums from "../Enums/CollectionEnums.js";

class DestructionService {
    public static Destroy(Entity: Entity): void {
        CollectionService.removeInstance(Entity, CollectionEnums.Entities);
    }
}

export default DestructionService;