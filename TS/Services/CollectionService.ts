import CollectionEnums from "../Enums/CollectionEnums.js";

const Collections: Array<Array<any> | undefined> = [];

class CollectionService {
    public static addCollection(tag: number) {
        Collections[tag] = [];
    }

    public static removeCollection(tag: number) {
        if (!Collections[tag]) {
            return;
        }
        
        delete(Collections[tag]);
    }

    public static retrieveCollection(tag: number): Array<any> | undefined {
        return Collections[tag];
    }

    public static addInstance(Instance: any, tag: number) {
        const collection = Collections[tag];
        if (!collection) {
            return;
        }

        collection[collection.length] = Instance;
    }

    public static removeInstance(Instance: any, tag: number) {
        const collection = Collections[tag];
        if (!collection) {
            return;
        }
        
        delete(collection[collection.indexOf(Instance)]);
    }

    public static getCollections(): Array<Array<any> | undefined> {
        return Collections;
    }
}

export default CollectionService;