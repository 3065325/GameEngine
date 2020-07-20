const Collections = [];
class CollectionService {
    static addCollection(tag) {
        Collections[tag] = [];
    }
    static removeCollection(tag) {
        if (!Collections[tag]) {
            return;
        }
        delete (Collections[tag]);
    }
    static retrieveCollection(tag) {
        return Collections[tag];
    }
    static addInstance(Instance, tag) {
        const collection = Collections[tag];
        if (!collection) {
            return;
        }
        collection[collection.length] = Instance;
    }
    static removeInstance(Instance, tag) {
        const collection = Collections[tag];
        if (!collection) {
            return;
        }
        delete (collection[collection.indexOf(Instance)]);
    }
    static getCollections() {
        return Collections;
    }
}
export default CollectionService;
//# sourceMappingURL=CollectionService.js.map