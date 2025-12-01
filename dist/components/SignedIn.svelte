<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { Readable } from 'svelte/store';
  import { AUTH_UI_CONTEXT_KEY, type AuthUIContext, type SessionState } from '../context/auth-ui';

  const { session = undefined, children } = $props<{
    session?: unknown | null;
    children?: Snippet;
  }>();

  const context = getContext<AuthUIContext | undefined>(AUTH_UI_CONTEXT_KEY);

  let contextSession = $state<unknown | null | undefined>(null);
  let unsubscribe: (() => void) | undefined;

  function subscribeSession<T>(store: Readable<SessionState<T>>) {
    unsubscribe = store.subscribe((value) => {
      contextSession = value?.data ?? null;
    });
  }

  if (context) {
    subscribeSession(context.hooks.useSession());
  }

  onDestroy(() => unsubscribe?.());

  const resolvedSession = $derived(context ? contextSession : session);
  const signedIn = $derived(Boolean(resolvedSession));
</script>

{#if signedIn}
  {@render children?.()}
{/if}
