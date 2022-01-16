import { SelectorPolicyOptions } from "./selector-policy-options";

export interface ISelectorPolicy {
    /**
     * Description of the result of the evaluation.
     */
    failureReason?: string;
    /**
     * Options of the policy.
     */
    options: SelectorPolicyOptions;

    /**
     * Evaluates a selector string against this policy and returns whether the selector
     * satisfies this policy or not
     * @param selector Selector string to be evaluated.
     */
    evaluate(selector: string): boolean;
}
