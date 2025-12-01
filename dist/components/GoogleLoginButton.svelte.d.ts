import type { ClassValue } from 'svelte/elements';
type $$ComponentProps = {
    label?: string;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    class?: ClassValue;
    onLogin?: () => void | Promise<void>;
};
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const GoogleLoginButton: $$__sveltets_2_IsomorphicComponent<$$ComponentProps, {
    click: CustomEvent<MouseEvent>;
    success: CustomEvent<void>;
    error: CustomEvent<unknown>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type GoogleLoginButton = InstanceType<typeof GoogleLoginButton>;
export default GoogleLoginButton;
