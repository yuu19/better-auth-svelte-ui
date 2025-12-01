<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cn } from '../utils';
  import type { ClassValue } from 'svelte/elements';

  const dispatch = createEventDispatcher<{
    click: MouseEvent;
    success: void;
    error: unknown;
  }>();

  const {
    label = 'Continue with Google',
    loading = false,
    disabled = false,
    fullWidth = false,
    onLogin,
    class: className
  } = $props<{
    label?: string;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    class?: ClassValue;
    onLogin?: () => void | Promise<void>;
  }>();

  let internalLoading = $state(false);

  const isLoading = $derived(loading || internalLoading);
  const isDisabled = $derived(disabled || isLoading);

  async function handleClick(event: MouseEvent) {
    if (isDisabled) return;

    dispatch('click', event);

    if (!onLogin) return;

    internalLoading = true;

    try {
      await onLogin();
      dispatch('success');
    } catch (error) {
      dispatch('error', error);
    } finally {
      internalLoading = false;
    }
  }
</script>

<button
  type="button"
  class={cn(
    'group relative inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition',
    'hover:bg-slate-100 active:translate-y-[1px]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-60',
    fullWidth && 'w-full justify-center',
    isDisabled && 'cursor-not-allowed',
    className
  )}
  aria-busy={isLoading}
  aria-disabled={isDisabled}
  aria-live="polite"
  data-provider="google"
  data-loading={isLoading ? 'true' : 'false'}
  onclick={handleClick}
>
  <span class="flex h-5 w-5 items-center justify-center rounded-sm bg-white" aria-hidden="true">
    <svg viewBox="0 0 24 24" class="h-5 w-5">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.82-.07-1.64-.23-2.43H12v4.61h6.46c-.28 1.49-1.12 2.75-2.38 3.6v2.98h3.84c2.25-2.07 3.57-5.12 3.57-8.76z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.84-2.98c-1.07.72-2.45 1.15-4.11 1.15-3.16 0-5.84-2.12-6.8-4.97H1.27v3.12A11.99 11.99 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.2 14.28A7.21 7.21 0 014.83 12c0-.79.14-1.56.38-2.28V6.6H1.27A11.99 11.99 0 000 12c0 1.93.46 3.76 1.27 5.4l3.93-3.12z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.12 15.23 0 12 0 7.27 0 3.17 2.73 1.27 6.6l3.93 3.12C6.16 6.87 8.84 4.75 12 4.75z"
      />
    </svg>
  </span>
  <span class="flex-1 whitespace-nowrap">{label}</span>
  {#if isLoading}
    <span
      class="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"
      aria-hidden="true"
    ></span>
  {/if}
  <span class="sr-only">{isLoading ? 'Signing in with Google…' : ''}</span>
</button>
