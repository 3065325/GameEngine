import CollectionService from "./CollectionService.js";
import CollectionEnums from "../Enums/CollectionEnums.js";
class DestructionService {
    static Destroy(Entity) {
        CollectionService.removeInstance(Entity, CollectionEnums.Entities);
    }
}
export default DestructionService;
//# sourceMappingURL=DestructionService.js.map