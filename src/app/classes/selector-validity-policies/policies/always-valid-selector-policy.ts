import { BaseSelectorPolicy } from "./base-selector-policy";

export class AlwaysValidSelectorPolicy extends BaseSelectorPolicy {
    
    constructor() {
        super();

        this.constraints = [
            _ => true
        ];
    }
}