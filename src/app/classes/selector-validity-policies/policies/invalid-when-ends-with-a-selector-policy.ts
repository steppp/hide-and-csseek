import { BaseSelectorPolicy } from "./base-selector-policy";

export class InvalidWhenEndsWithASelectorPolicy extends BaseSelectorPolicy {

    override failureReason: string = "Selector ends with 'a'";

    constructor() {
        super()

        this.constraints = [
            (selector) => !selector.endsWith('a')
        ]
    }
}