class TMatrix {
    static transpose(M1) {
        const M2 = new Array(M1[0].length);
        for (let i = 0; i < M2.length; i++) {
            const M2Row = new Array(M1.length);
            for (let j = 0; j < M2Row.length; j++) {
                M2Row[j] = M1[j][i];
            }
            M2[i] = M2Row;
        }
        return M2;
    }
    static multM(M1, M2) {
        if (M1.length !== M2[0].length) {
            console.log(`Attempted to multiply a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return [];
        }
        const M3 = new Array(M2.length);
        for (let i = 0; i < M2.length; i++) {
            const M3Row = new Array(M1[0].length);
            for (let j = 0; j < M1[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < M1.length; k++) {
                    sum += M2[i][k] * M1[k][j];
                }
                M3Row[j] = sum;
            }
            M3[i] = M3Row;
        }
        return M3;
    }
    static multS(S, M1) {
        const M2 = new Array(M1.length);
        for (let i = 0; i < M2.length; i++) {
            const M1Row = M1[i];
            const M2Row = new Array(M1Row.length);
            for (let j = 0; j < M1Row.length; j++) {
                M2Row[j] = S * M1Row[j];
            }
            M2[i] = M2Row;
        }
        return M2;
    }
    static add(M1, M2) {
        if (M1.length !== M2.length || M1[0].length !== M2[0].length) {
            console.log(`Attempted to add a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return [];
        }
        const M3 = new Array(M1.length);
        for (let i = 0; i < M3.length; i++) {
            const M1Row = M1[i];
            const M2Row = M2[i];
            const M3Row = new Array(M1Row.length);
            for (let j = 0; j < M1Row.length; j++) {
                M3Row[j] = M1Row[j] + M2Row[j];
            }
            M3[i] = M3Row;
        }
        return M3;
    }
    static cross(V1, V2) {
        if (V1.length !== 1 || V1[0].length !== 3 || V1.length !== V2.length || V1[0].length !== V2[0].length) {
            console.log(`Attempted to cross incompatible Vectors`);
            return [];
        }
        const v1 = V1[0];
        const v2 = V2[0];
        const V3 = new Array(3);
        V3[0] = v1[1] * v2[2] - v1[2] * v2[1];
        V3[1] = v1[2] * v2[0] - v1[0] * v2[2];
        V3[2] = v1[0] * v2[1] - v1[1] * v2[0];
        return [V3];
    }
    static dot(M1, M2) {
        if (M1.length !== M2.length || M1[0].length !== M2[0].length) {
            console.log(`Attempted to dot a ${M1.length}x${M1[0].length} with a ${M2.length}x${M2[0].length}`);
            return [];
        }
        const M3 = TMatrix.multM(TMatrix.transpose(M1), M2);
        return M3;
    }
    static mag(M1) {
        const mags = new Array(M1.length);
        for (let i = 0; i < M1.length; i++) {
            mags[i] = Math.sqrt(M1[i].reduce((a, b) => a + b, 0));
        }
        return mags;
    }
    static normalize(M1) {
        const M2 = new Array(M1.length);
        const mags = TMatrix.mag(M1);
        for (let i = 0; i < M1.length; i++) {
            M2[i] = M1[i].map((v) => {
                return v * mags[i];
            });
        }
        return M2;
    }
    static sub(M1, M2) {
        if (M1.length !== M2.length || M1[0].length !== M2[0].length) {
            console.log(`Attempted to subtract a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return [];
        }
        const M3 = new Array(M1.length);
        for (let i = 0; i < M3.length; i++) {
            const M1Row = M1[i];
            const M2Row = M2[i];
            const M3Row = new Array(M1Row.length);
            for (let j = 0; j < M1Row.length; j++) {
                M3Row[j] = M1Row[j] - M2Row[j];
            }
            M3[i] = M3Row;
        }
        return M3;
    }
    static Translate(Vector) {
        const M1 = new Array(Vector.length + 1);
        for (let i = 0; i < M1.length; i++) {
            let M1Row = new Array(M1.length);
            for (let j = 0; j < M1.length; j++) {
                if (j === i) {
                    M1Row[j] = 1;
                    continue;
                }
                if (i === M1.length - 1) {
                    M1Row = [...Vector, 1];
                    break;
                }
                M1Row[j] = 0;
            }
            M1[i] = M1Row;
        }
        return M1;
    }
    static Dilate(Vector) {
        const M1 = new Array(Vector.length + 1);
        for (let i = 0; i < M1.length; i++) {
            const M1Row = new Array(M1.length);
            for (let j = 0; j < M1.length; j++) {
                if (j === i) {
                    if (i === M1.length - 1) {
                        M1Row[j] = 1;
                        continue;
                    }
                    M1Row[j] = Vector[i];
                }
                else {
                    M1Row[j] = 0;
                }
            }
            M1[i] = M1Row;
        }
        return M1;
    }
    static RotateXY1(Angle) {
        const M1 = [
            [Math.cos(Angle), Math.sin(Angle), 0],
            [-Math.sin(Angle), Math.cos(Angle), 0],
            [0, 0, 1]
        ];
        return M1;
    }
}
export default TMatrix;
//# sourceMappingURL=TMatrices.js.map