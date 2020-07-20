import TMatrix from "../Library/TMatrices.js";
import CollectionService from "./CollectionService.js";

const max = Math.max;
const min = Math.min;

class CollisionService {
    public static SAT(M1: Array<Array<number>>, M2: Array<Array<number>>): Array<number> {
        const M1o: Array<Array<number>> = M1.map((_, k) => {
            return M1[(k+1) % M1.length];
        });

        const M2o: Array<Array<number>> = M2.map((_, k) => {
            return M2[(k+1) % M2.length];
        });

        const M1e = TMatrix.sub(M1o, M1);
        const M2e = TMatrix.sub(M2o, M2);

        const E = TMatrix.normalize(M1e.concat(M2e));
        const A = TMatrix.multM([
            [ 0, 1, 0],
            [-1, 0, 0],
            [ 0, 0, 1]
        ], E);

        const PM1: Array<number> = TMatrix.dot(A, M1)[0];
        const PM2: Array<number> = TMatrix.dot(A, M2)[0];

        const M1M: number = max(...PM1);
        const M1m: number = min(...PM1);
        const M2M: number = max(...PM2);
        const M2m: number = min(...PM2);

        const D: number = min(0, max(M1M, M2M) - min(M1m, M2m));
        const V: Array<number> = TMatrix.multS(D, A)[0];

        return V;
    }
}

export default CollisionService;
// I need a Polygon colliding with Polygon detector, basic Rectangle colliding with basic Rectangle detector, non-axis-aligned Rectangle colliding withnon-axis-aligned Rectangle detector.
