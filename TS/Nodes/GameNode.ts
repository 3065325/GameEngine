class GameNode {
    constructor(public Parent: GameNode, public Children ?: Array<GameNode>) {
        this.Parent = Parent;
        this.Children = Children ? Children : [];
    }
}

export default GameNode;