import TMatrix from "../Library/TMatrices.js";
const max = Math.max;
const min = Math.min;
class CollisionService {
    static SAT(M1, M2) {
        const M1o = M1.map((_, k) => {
            return M1[(k + 1) % M1.length];
        });
        const M2o = M2.map((_, k) => {
            return M2[(k + 1) % M2.length];
        });
        const M1e = TMatrix.sub(M1o, M1);
        const M2e = TMatrix.sub(M2o, M2);
        const E = TMatrix.normalize(M1e.concat(M2e));
        const A = TMatrix.multM([
            [0, 1, 0],
            [-1, 0, 0],
            [0, 0, 1]
        ], E);
        const PM1 = TMatrix.dot(A, M1)[0];
        const PM2 = TMatrix.dot(A, M2)[0];
        const M1M = max(...PM1);
        const M1m = min(...PM1);
        const M2M = max(...PM2);
        const M2m = min(...PM2);
        const D = min(0, max(M1M, M2M) - min(M1m, M2m));
        const V = TMatrix.multS(D, A)[0];
        return V;
    }
}
export default CollisionService;
//# sourceMappingURL=CollisionService.js.map