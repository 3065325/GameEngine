 /* https://github.com/timohausmann/quadtree-js.git v1.2.2 */
 
/*
Copyright © 2012-2020 Timo Hausmann
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

interface Bounds {
    x: number,
    y: number,
    width: number,
    height: number
}

class Data {
    public Bounds: Bounds;
    public data: any;

    constructor(Bounds: Bounds, data: any) {
        this.Bounds = Bounds;
        this.data = data;
    }
}

/**
 * Quadtree-ts
 * @version 1.0.0
 * @license MIT
 * @author Timo Hausmann
 * @author NPA
 */

class QuadTree {
    public Bounds: Bounds;
    public level: number;

    public MaxObjects: number;
    public MaxLevel: number;

    public Objects: Array<Data>;
    public Branches: Array<QuadTree>;

    /**
     * Quadtree Constructor
     * @param Object Bounds          bounds of the node { x, y, width, height }
     * @param Integer MaxObjects     (optional) max objects a node can hold before splitting into 4 subnodes (default: 10)
     * @param Integer MaxLevel       (optional) total max level inside root Quadtree (default: 4) 
     * @param Integer level          (optional) depth level, required for subnodes (default: 0)
     */

    constructor(Bounds: Bounds, MaxObjects ?: number, MaxLevel ?: number, level ?: number) {
        this.Bounds = Bounds;
        this.level = level || 0;

        this.MaxObjects = MaxObjects || 10;
        this.MaxLevel = MaxLevel || 4;

        this.Objects = [];
        this.Branches = new Array(4);
    }

    /**
     * Divide the node into 4 subnodes.
     */

    public Divide(): void {
        const nextLevel = this.level + 1,
              subWidth = this.Bounds.width * 0.5,
              subHeight = this.Bounds.height * 0.5,
              xPos = this.Bounds.x,
              yPos = this.Bounds.y;
        
        this.Branches[0] = new QuadTree({
            x: xPos + subWidth as number,
            y: yPos + subHeight as number,
            width: subWidth as number,
            height: subHeight as number
        }, this.MaxObjects, this.MaxLevel, nextLevel);

        this.Branches[1] = new QuadTree({
            x: xPos - subWidth as number,
            y: yPos + subHeight as number,
            width: subWidth as number,
            height: subHeight as number
        }, this.MaxObjects, this.MaxLevel, nextLevel);

        this.Branches[2] = new QuadTree({
            x: xPos - subWidth as number,
            y: yPos - subHeight as number,
            width: subWidth as number,
            height: subHeight as number
        }, this.MaxObjects, this.MaxLevel, nextLevel);

        this.Branches[3] = new QuadTree({
            x: xPos + subWidth as number,
            y: yPos - subHeight as number,
            width: subWidth as number,
            height: subHeight as number
        }, this.MaxObjects, this.MaxLevel, nextLevel);
    }

    /**
     * Determine which node the object belongs to
     * @param Object areaBounds      bounds of the area to be checked, with x, y, width, height
     * @return Array                 an array of indexes of the intersecting subnodes 
     *                               (0-3 = top-right, top-left, bottom-left, bottom-right / ne, nw, sw, se)
     */

    public GetIndices(areaBounds: Bounds): Array<number> {
        const indices: Array<number> = [],
              verticalMidpoint: number = this.Bounds.x + this.Bounds.width * 0.5,
              horizontalMidpoint: number = this.Bounds.y + this.Bounds.height * 0.5;

        const startIsUp: boolean = areaBounds.y < horizontalMidpoint,
              startIsLeft: boolean = areaBounds.x < verticalMidpoint,
              endIsRight: boolean = areaBounds.x + areaBounds.width > verticalMidpoint,
              endIsDown: boolean = areaBounds.y + areaBounds.height > horizontalMidpoint;

        // top-right quadrant
        if(startIsUp && endIsRight) {
            indices.push(0);
        }
        
        // top-left quadrant
        if(startIsLeft && startIsUp) {
            indices.push(1);
        }

        // bottom-left quadrant
        if(startIsLeft && endIsDown) {
            indices.push(2);
        }

        // bottom-right quadrant
        if(endIsRight && endIsDown) {
            indices.push(3);
        }
     
        return indices;
    }

    /**
     * Insert the object into the node. If the node
     * exceeds the capacity, it will split and add all
     * objects to their corresponding subnodes.
     * @param Object areaBounds        bounds of the object to be added { x, y, width, height }
     */

    public Insert(areaBounds: Bounds, data: any): void {
        let indices: Array<number>;

        const dataArea = new Data(areaBounds, data);

        if (this.Branches[0] !== undefined) {
            indices = this.GetIndices(areaBounds);

            for (let i = 0; i < indices.length; i++) {
                this.Branches[indices[i]].Insert(areaBounds, data);  
            }
            return;
        }

        this.Objects.push(dataArea);

        if(this.Objects.length > this.MaxObjects && this.level < this.MaxLevel) {
            if (this.Branches[0] === undefined) {
                this.Divide();
            }

            for (let i = 0; i < this.Objects.length; i++) {
                const foundDataArea = this.Objects[i];

                indices = this.GetIndices(foundDataArea.Bounds);

                for (let  k = 0; k < indices.length; k++) {
                    this.Branches[indices[k]].Insert(foundDataArea.Bounds, foundDataArea.data);
                }
            }

            this.Objects = [];
        }
    }

    /**
     * Return all objects that could collide with the given object
     * @param Object pRect      bounds of the object to be checked { x, y, width, height }
     * @Return Array            array with all detected objects
     */

    public Retrieve(areaBounds: Bounds): Array<any> {
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

    /**
     * Clear the quadtree
     */

    public Clear(): void {
        this.Objects = [];

        for (let i = 0; i < this.Branches.length; i++) {
            if (this.Branches[0] !== undefined) {
                this.Branches[i].Clear();
            }
        }

        this.Branches = new Array(4);
    }
}

export {Bounds};
export default QuadTree;