import CollectionService from "./Services/CollectionService.js";
import Registry from "./registry.js";
const PhysicsLoop = setInterval(() => {
    CollectionService.getCollections().forEach((Collection) => {
        if (!Collection) {
            return;
        }
        ;
        Collection.forEach((Member) => {
            if (Member.OnPhysicsUpdate) {
                Member.OnPhysicsUpdate(Registry.physicsDelta);
            }
        });
    });
}, Registry.physicsDelta);
//# sourceMappingURL=physics.js.map