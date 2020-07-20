class SetHandler {
    static AddN(S1, S2) {
        if (S1.length !== S2.length) {
            console.log(`Cannot add set of length ${S1.length} and ${S2.length}`);
            return [];
        }
        const S3 = S1.map((v, k) => {
            return v + S2[k];
        });
        return S3;
    }
    static SubN(S1, S2) {
        if (S1.length !== S2.length) {
            console.log(`Cannot subtract set of length ${S1.length} and ${S2.length}`);
            return [];
        }
        const S3 = S1.map((v, k) => {
            return v - S2[k];
        });
        return S3;
    }
}
//# sourceMappingURL=SetHandler.js.map