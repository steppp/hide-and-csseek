import { ISelectorPolicy } from "./selector-policy.interface";
import { SelectorPolicyOptions } from "./selector-policy-options";

/**
 * Base class which implements ISelector Policy. Inherit from this to have a default implementation of
 * the evaluate method.
 * @implements ISelectorPolicy
 */
export abstract class BaseSelectorPolicy implements ISelectorPolicy {
    options: SelectorPolicyOptions = SelectorPolicyOptions.default;

    // TODO: move into a constants file
    failureReason = "Not yet evaluated";
    constraints: Array<(selector: string) => boolean> = []

    evaluate(selector: string): boolean {
        if (!this.options.enabled) {
            // ignore this policy when it is not enabled
            return true;
        }
        
        return this.constraints.every(constraint => constraint.call(this, selector));
    }
}