import CollectionService from "./Services/CollectionService.js";
import CollectionEnums from "./Enums/CollectionEnums.js";
import Registry from "./registry.js";

const PhysicsLoop = setInterval((): void => {
    CollectionService.getCollections().forEach((Collection) => {
        if (!Collection) { return; };

        Collection.forEach((Member) => {
            if (Member.OnPhysicsUpdate) {
                Member.OnPhysicsUpdate(Registry.physicsDelta);
            }
        })
    });
}, Registry.physicsDelta);