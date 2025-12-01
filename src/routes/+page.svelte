<script lang="ts">
  import { Mail } from 'lucide-svelte';
  import { authClient } from '$lib/auth-client';
  import SocialProvidersRow from '$lib/components/social/SocialProvidersRow.svelte';

  type Mode = 'signIn' | 'signUp';

  let mode = $state<Mode>('signIn');
  let name = $state('');
  let email = $state('m@example.com');
  let password = $state('');
  let busy = $state(false);
  let socialBusy = $state(false);
  let message = $state<'idle' | 'ok' | 'error'>('idle');

  const copy = $derived(
    mode === 'signIn'
      ? {
          title: 'Sign In',
          subtitle: 'Enter your email below to login to your account',
          cta: 'Login',
          magicLabel: 'Sign in with Magic Link',
          switchPrompt: "Don't have an account?",
          switchLabel: 'Sign Up'
        }
      : {
          title: 'Sign Up',
          subtitle: 'Enter your information to create an account',
          cta: 'Create an account',
          magicLabel: 'Sign up with Magic Link',
          switchPrompt: 'Already have an account?',
          switchLabel: 'Sign In'
        }
  );

  function switchMode(next: Mode) {
    if (mode === next) return;
    mode = next;
    message = 'idle';
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    busy = true;
    message = 'idle';
    const path =
      mode === 'signIn' ? 'sign-in/email' : 'sign-up/email';
    try {
      const res = (await authClient.$fetch(path, {
        method: 'POST',
        body: { email, password, name: mode === 'signUp' ? name : undefined }
      })) as { url?: string };

      if (res?.url) {
        window.location.href = res.url;
        return;
      }
      message = 'ok';
    } catch (e) {
      console.error(e);
      message = 'error';
    } finally {
      busy = false;
    }
  }

  async function handleMagicLink() {
    busy = true;
    message = 'idle';
    const path =
      mode === 'signIn' ? 'sign-in/magic-link' : 'sign-up/magic-link';
    try {
      await authClient.$fetch(path, {
        method: 'POST',
        body: { email, name: mode === 'signUp' ? name : undefined }
      });
      message = 'ok';
    } catch (e) {
      console.error(e);
      message = 'error';
    } finally {
      busy = false;
    }
  }

  async function handleGoogle() {
    socialBusy = true;
    message = 'idle';
    try {
      // better-auth client handles redirects automatically when the provider flow returns a URL
      const res = await authClient.signIn.social({ provider: 'google' });
      // If an ID token flow is used and no redirect occurs, show success feedback
      if (res?.redirect === false) message = 'ok';
    } catch (e) {
      console.error(e);
      message = 'error';
    } finally {
      socialBusy = false;
    }
  }
</script>

<svelte:head>
  <title>Better Auth Svelte UI | {copy.title}</title>
</svelte:head>

<main class="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 py-12">
  <div class="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)]">
    <div class="flex items-center gap-2 rounded-2xl bg-slate-100 p-1 text-sm font-semibold text-slate-500">
      <button
        type="button"
        class={`flex-1 rounded-xl px-3 py-2 transition ${mode === 'signIn' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
        onclick={() => switchMode('signIn')}
      >
        Sign In
      </button>
      <button
        type="button"
        class={`flex-1 rounded-xl px-3 py-2 transition ${mode === 'signUp' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
        onclick={() => switchMode('signUp')}
      >
        Sign Up
      </button>
    </div>

    <div class="mt-6 space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900">{copy.title}</h1>
      <p class="text-sm text-slate-500">{copy.subtitle}</p>
    </div>

    <form class="mt-6 space-y-4" onsubmit={handleSubmit}>
      {#if mode === 'signUp'}
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-800" for="name">Name</label>
          <input
            id="name"
            name="name"
            class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-inner outline-none transition focus:border-slate-400"
            placeholder="Name"
            bind:value={name}
            required
          />
        </div>
      {/if}

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-800" for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-inner outline-none transition focus:border-slate-400"
          placeholder="m@example.com"
          bind:value={email}
          required
        />
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm font-semibold text-slate-800">
          <label for="password">Password</label>
          {#if mode === 'signIn'}
            <a href="/reset" class="text-slate-500 hover:text-slate-700">Forgot your password?</a>
          {/if}
        </div>
        <input
          id="password"
          name="password"
          type="password"
          class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-inner outline-none transition focus:border-slate-400"
          placeholder="Password"
          bind:value={password}
          required
        />
      </div>

      <button
        type="submit"
        class="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={busy}
      >
        {busy ? 'Working...' : copy.cta}
      </button>

      <button
        type="button"
        class="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-100 disabled:opacity-60"
        onclick={handleMagicLink}
        disabled={busy}
      >
        <Mail class="h-4 w-4" /> {copy.magicLabel}
      </button>

      <SocialProvidersRow
        disabled={busy || socialBusy}
        onGoogle={handleGoogle}
        googleLoading={socialBusy}
      />

      <p class="pt-2 text-center text-sm text-slate-600">
        {copy.switchPrompt}
        <button
          type="button"
          class="font-semibold text-slate-900 underline underline-offset-4"
          onclick={() => switchMode(mode === 'signIn' ? 'signUp' : 'signIn')}
        >
          {copy.switchLabel}
        </button>
      </p>
      {#if message === 'ok'}
        <p class="text-center text-sm font-semibold text-emerald-600">
          {mode === 'signIn' ? 'Success! You are logged in.' : 'Almost there—check your email to verify your account.'}
        </p>
      {:else if message === 'error'}
        <p class="text-center text-sm font-semibold text-rose-600">Something went wrong.</p>
      {/if}
    </form>
  </div>
</main>
