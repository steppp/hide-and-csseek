export class SelectorPolicyOptions {
    /**
     * Priority of policy evaluation. A higher number means higher priority and
     * an earlier evaluation.
     */
    priority: number = 0;
    /**
     * Whether this policy should be evaluated or not.
     */
    enabled: boolean = true;

    constructor(enabled?: boolean, priority?: number) {
        enabled !== undefined && (this.enabled = enabled)
        priority !== undefined && (this.priority = priority)
    }

    /**
     * Default policy options in an enabled status and 0 priority.
     */
    static default = new SelectorPolicyOptions()
}