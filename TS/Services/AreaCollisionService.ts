import QuadTree, { Bounds } from "../Library/Quadtree.js";
import Registry from "../registry.js";
import CollectionService from "./CollectionService.js";
import CollectionEnums from "../Enums/CollectionEnums.js";
import Area from "../Nodes/Area.js";
import TMatrix from "../Library/TMatrices.js";
import CollisionService from "./CollisionService.js";

const tempWidth: number = 1000*Registry.m;
const tempHeight: number = 1000*Registry.m;

const AreaTree = new QuadTree({
    x: 0,
    y: 0,
    width: tempWidth,
    height: tempHeight
}, 4, 10);

class AreaCollisionService {
    public static onPhysicsUpdate(delta: number) {
        AreaTree.Clear();

        const Areas = CollectionService.retrieveCollection(CollectionEnums.Areas) || [];
        const AreaObjects: Array<Bounds> = [];

        for (let i = 0; i < Areas.length; i++) {
            const area: Area = Areas[i];
            const areaObject = {
                x: area.Translation[0],
                y: area.Translation[1],
                width: area.Dilation[0],
                height: area.Dilation[1]
            };

            AreaObjects[i] = areaObject;
            AreaTree.Insert(areaObject, i);
        }

        for (let i = 0; i < AreaObjects.length; i++) {
            const area: Area = Areas[i];
            const areaObject: Bounds = AreaObjects[i];

            const retrieved = AreaTree.Retrieve(areaObject);

            for (let j = 0; j < retrieved.length; j++) {
                const nearArea = retrieved[j];
                if (area === nearArea) { continue; };

                const Correction = CollisionService.SAT(TMatrix.multM(area.GlobalTransform, area.Vertices), TMatrix.multM(nearArea.GlobalTransform, nearArea.Vertices));

                if (Correction[0] !== 0 || Correction[1] !== 0) {
                    area.Translate(Correction);
                }
            }
        }
    }
}

export default AreaCollisionService;