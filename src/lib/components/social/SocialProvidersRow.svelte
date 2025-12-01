<script lang="ts">
  import { Github } from 'lucide-svelte';
  import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';

  const {
    onGithub,
    onGoogle,
    onFacebook,
    onApple,
    googleLoading = false,
    disabled = false
  } = $props<{
    onGithub?: () => void | Promise<void>;
    onGoogle?: () => void | Promise<void>;
    onFacebook?: () => void | Promise<void>;
    onApple?: () => void | Promise<void>;
    googleLoading?: boolean;
    disabled?: boolean;
  }>();
</script>

<div class="flex items-center gap-3 pt-2">
  <button
    type="button"
    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-400 disabled:opacity-60"
    aria-label="Sign in with GitHub"
    onclick={onGithub}
    disabled={disabled}
  >
    <Github class="h-5 w-5 text-slate-900" />
  </button>

  <GoogleLoginButton
    class="flex-1 h-12 justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60"
    loading={googleLoading}
    iconOnly
    label="Sign in with Google"
    onclick={onGoogle}
    disabled={disabled}
  />

  <button
    type="button"
    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-400 disabled:opacity-60"
    aria-label="Sign in with Facebook"
    onclick={onFacebook}
    disabled={disabled}
  >
    <svg viewBox="0 0 24 24" class="h-5 w-5 fill-[#1877F2]" aria-hidden="true">
      <path
        d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.86 6.48 1.86 12.07c0 5 3.66 9.14 8.44 9.93v-7.02H7.9v-2.91h2.4V9.86c0-2.37 1.41-3.68 3.57-3.68 1.04 0 2.12.19 2.12.19v2.33h-1.2c-1.18 0-1.55.74-1.55 1.49v1.78h2.64l-.42 2.91h-2.22v7.02c4.78-.79 8.44-4.93 8.44-9.93Z"
      />
    </svg>
  </button>

  <button
    type="button"
    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-400 disabled:opacity-60"
    aria-label="Sign in with Apple"
    onclick={onApple}
    disabled={disabled}
  >
    <svg viewBox="0 0 24 24" class="h-5 w-5 fill-black" aria-hidden="true">
      <path
        d="M17.6 12.58c.02 2.29 2.01 3.05 2.03 3.06-.02.05-.32 1.11-1.04 2.2-.63.98-1.29 1.95-2.32 1.97-1.02.02-1.35-.64-2.51-.64-1.16 0-1.53.62-2.5.66-1.01.04-1.78-1.06-2.42-2.03-1.31-2-2.3-5.66-1-8.13.69-1.3 1.92-2.12 3.26-2.14 1.02-.02 1.99.7 2.51.7.52 0 1.73-.86 2.92-.73.5.02 1.9.2 2.8 1.55-.07.04-1.67.97-1.65 2.53Z"
      />
      <path
        d="M14.82 5.64c.55-.67.92-1.61.82-2.54-.79.03-1.75.54-2.32 1.2-.51.58-.96 1.52-.84 2.42.89.07 1.79-.45 2.34-1.08Z"
      />
    </svg>
  </button>
</div>
