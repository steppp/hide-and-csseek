import { ISelectorPolicy } from "./policies/selector-policy.interface";

export interface ISelectorPoliciesCollection {
    /**
     * Get a list of all policies registered in the collection.
     */
    get policies(): ISelectorPolicy[];
    
    /**
     * Adds a policy to the collection of policies to be evaluated. The priority is used to
     * compute the policy position in the array. Note that it is added even if its status is disabled.
     * @param newPolicy Policy to add to the collection of policies to be evaluated.
     */
    addPolicy(newPolicy: ISelectorPolicy): void;
}