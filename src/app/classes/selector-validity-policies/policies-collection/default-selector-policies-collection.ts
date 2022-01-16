import { ISelectorPoliciesCollection } from "./selector-policies-collection.interface";
import { ISelectorPolicy } from "../policies/selector-policy.interface";

export class DefaultSelectorPoliciesCollection implements ISelectorPoliciesCollection {
    private _policies: ISelectorPolicy[];

    constructor(requiredPolicies: ISelectorPolicy[]) {
        // TODO: find a way to prevent duplicated data
        this._policies = requiredPolicies;
        this._policies.sort((policyA, policyB) => policyA.options.priority - policyB.options.priority);
    }

    get policies(): ISelectorPolicy[] {
        return this._policies;
    }

    addPolicy(newPolicy: ISelectorPolicy): void {
        let insertionIndex = this._policies
            .findIndex(policy => policy.options.priority <= newPolicy.options.priority);
        if (insertionIndex === -1) {
            // no policies in the array
            // or no policy with lower priority
            this._policies.push(newPolicy);
        } else {
            this._policies.splice(insertionIndex, 0, newPolicy);
        }
    }
}