import type { Readable } from 'svelte/store';
export type SessionState<TData = unknown> = {
    data?: TData | null;
};
export type AuthUIContext<TData = unknown> = {
    hooks: {
        /**
         * Returns a readable session store. When data exists, the user is authenticated.
         */
        useSession: () => Readable<SessionState<TData>>;
    };
};
export declare const AUTH_UI_CONTEXT_KEY: unique symbol;
