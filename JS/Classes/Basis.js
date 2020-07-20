"use strict";
class Basis {
    static fromVectors(VectorX, VectorY) {
        const B = [
            [...VectorX, 0],
            [...VectorY, 0],
            [0, 0, 1]
        ];
    }
}
//# sourceMappingURL=Basis.js.map