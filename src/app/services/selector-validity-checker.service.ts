import { Injectable } from '@angular/core';
import { ISelectorPolicy } from '../classes/selector-validity-policies/policies/selector-policy.interface';
import { AlwaysValidSelectorPolicy } from '../classes/selector-validity-policies/policies/always-valid-selector-policy';
import { InvalidWhenEndsWithASelectorPolicy } from '../classes/selector-validity-policies/policies/invalid-when-ends-with-a-selector-policy';

@Injectable({
  providedIn: 'root'
})
export class SelectorValidityCheckerService {
  private static DEFAULT_SUCCESS_RESULT_REASON = "All policies evaluated to true";

  public resultReason: string = "";

  private _policies: ISelectorPolicy[] = [];

  constructor() {
    this.resetPolicyEvaluationResults();
    this.resetPolicyEvaluationParams();
  }

  private resetPolicyEvaluationParams() {
    this._policies = [
      new AlwaysValidSelectorPolicy(),
      new InvalidWhenEndsWithASelectorPolicy()
    ]
    this._policies.sort((a, b) => a.options.priority - b.options.priority);
    this._policies.filter(policy => policy.options.enabled);
  }

  private resetPolicyEvaluationResults() {
    this.resultReason = SelectorValidityCheckerService.DEFAULT_SUCCESS_RESULT_REASON;
  }

  /**
   * Check for selector validity against all the active policies. The explanation of the result can
   * be seen by accessing the @member resultReason instance variable.
   * @param selector String to check against all the currently enabled policies
   * @returns true if the provided selector satisfies all the loaded policies, false otherwise
   */
  isValid(selector: string): boolean {
    this.resetPolicyEvaluationResults();

    // evaluate all policies; stop as soon as one evaluates to false
    let result = this._policies
      .every(policy => {
        let policyEvaluationResult = policy.evaluate(selector);
        // when a policy evaluates to false, save the failure reason
        !policyEvaluationResult && (this.resultReason = policy.failureReason!);

        return policyEvaluationResult;
      }, this);

    // here resultReason will have the default value if all policies evaluations succeded
    // or the failure reason for the first policy which failed
    return result;
  }

  addPolicy(newPolicy: ISelectorPolicy, priority: number = 0) {

  }
}
