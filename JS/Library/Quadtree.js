class Data {
    constructor(Bounds, data) {
        this.Bounds = Bounds;
        this.data = data;
    }
}
class QuadTree {
    constructor(Bounds, MaxObjects, MaxLevel, level) {
        this.Bounds = Bounds;
        this.level = level || 0;
        this.MaxObjects = MaxObjects || 10;
        this.MaxLevel = MaxLevel || 4;
        this.Objects = [];
        this.Branches = new Array(4);
    }
    Divide() {
        const nextLevel = this.level + 1, subWidth = this.Bounds.width * 0.5, subHeight = this.Bounds.height * 0.5, xPos = this.Bounds.x, yPos = this.Bounds.y;
        this.Branches[0] = new QuadTree({
            x: xPos + subWidth,
            y: yPos + subHeight,
            width: subWidth,
            height: subHeight
        }, this.MaxObjects, this.MaxLevel, nextLevel);
        this.Branches[1] = new QuadTree({
            x: xPos - subWidth,
            y: yPos + subHeight,
            width: subWidth,
            height: subHeight
        }, this.MaxObjects, this.MaxLevel, nextLevel);
        this.Branches[2] = new QuadTree({
            x: xPos - subWidth,
            y: yPos - subHeight,
            width: subWidth,
            height: subHeight
        }, this.MaxObjects, this.MaxLevel, nextLevel);
        this.Branches[3] = new QuadTree({
            x: xPos + subWidth,
            y: yPos - subHeight,
            width: subWidth,
            height: subHeight
        }, this.MaxObjects, this.MaxLevel, nextLevel);
    }
    GetIndices(areaBounds) {
        const indices = [], verticalMidpoint = this.Bounds.x + this.Bounds.width * 0.5, horizontalMidpoint = this.Bounds.y + this.Bounds.height * 0.5;
        const startIsUp = areaBounds.y < horizontalMidpoint, startIsLeft = areaBounds.x < verticalMidpoint, endIsRight = areaBounds.x + areaBounds.width > verticalMidpoint, endIsDown = areaBounds.y + areaBounds.height > horizontalMidpoint;
        if (startIsUp && endIsRight) {
            indices.push(0);
        }
        if (startIsLeft && startIsUp) {
            indices.push(1);
        }
        if (startIsLeft && endIsDown) {
            indices.push(2);
        }
        if (endIsRight && endIsDown) {
            indices.push(3);
        }
        return indices;
    }
    Insert(areaBounds, data) {
        let indices;
        const dataArea = new Data(areaBounds, data);
        if (this.Branches[0] !== undefined) {
            indices = this.GetIndices(areaBounds);
            for (let i = 0; i < indices.length; i++) {
                this.Branches[indices[i]].Insert(areaBounds, data);
            }
            return;
        }
        this.Objects.push(dataArea);
        if (this.Objects.length > this.MaxObjects && this.level < this.MaxLevel) {
            if (this.Branches[0] === undefined) {
                this.Divide();
            }
            for (let i = 0; i < this.Objects.length; i++) {
                const foundDataArea = this.Objects[i];
                indices = this.GetIndices(foundDataArea.Bounds);
                for (let k = 0; k < indices.length; k++) {
                    this.Branches[indices[k]].Insert(foundDataArea.Bounds, foundDataArea.data);
                }
            }
            this.Objects = [];
        }
    }
    Retrieve(areaBounds) {
        const indices = this.GetIndices(areaBounds);
        let returnObjects = this.Objects;
        if (this.Branches[0] !== undefined) {
            for (let i = 0; i < indices.length; i++) {
                returnObjects = returnObjects.concat(this.Branches[indices[i]].Retrieve(areaBounds));
            }
        }
        returnObjects = returnObjects.filter((v, k) => {
            return returnObjects.indexOf(v) >= k;
        });
        return returnObjects.map((v) => {
            return v.data;
        });
    }
    Clear() {
        this.Objects = [];
        for (let i = 0; i < this.Branches.length; i++) {
            if (this.Branches[0] !== undefined) {
                this.Branches[i].Clear();
            }
        }
        this.Branches = new Array(4);
    }
}
export default QuadTree;
//# sourceMappingURL=Quadtree.js.map