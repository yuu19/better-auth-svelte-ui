<script lang="ts">
  import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
  import Sparkles from 'lucide-svelte/icons/sparkles';
  import { getContext, onDestroy } from 'svelte';
  import type { AuthUIContext } from '$lib/context/auth-ui';
  import { AUTH_UI_CONTEXT_KEY } from '$lib/context/auth-ui';

  type UserLike = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;

  const {
    session = undefined,
    heading = "You're in!",
    subheading = 'Authentication succeeded. You can safely continue.',
    continueHref = '/dashboard',
    continueLabel = 'Go to dashboard',
    secondaryHref = '',
    secondaryLabel = 'Switch account',
    showEmail = true,
    footer
  } = $props<{
    session?: unknown | null;
    heading?: string;
    subheading?: string;
    continueHref?: string;
    continueLabel?: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    showEmail?: boolean;
    footer?: () => unknown;
  }>();

  const context = getContext<AuthUIContext | undefined>(AUTH_UI_CONTEXT_KEY);

  let contextSession = $state<unknown | null | undefined>(null);
  let unsubscribe: (() => void) | undefined;

  if (context) {
    const store = context.hooks.useSession();
    unsubscribe = store.subscribe((value) => {
      contextSession = value?.data ?? null;
    });
  }

  onDestroy(() => unsubscribe?.());

  const resolvedSession = $derived(context ? contextSession : session);

  const user = $derived.by<UserLike>(() => {
    if (!resolvedSession) return null;
    return (resolvedSession as any).user ?? (resolvedSession as any);
  });

  const hasSession = $derived(Boolean(resolvedSession));
  const avatarLetter = $derived.by(() => {
    if (!user) return '🙂';
    const seed = user.name ?? user.email ?? '';
    return seed.slice(0, 1).toUpperCase() || '🙂';
  });
</script>

{#if hasSession}
  <section
    class="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm"
    aria-label="Login success"
  >
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_80%_0,rgba(99,102,241,0.12),transparent_30%)]"></div>

    <div class="relative flex gap-4">
      <div class="relative shrink-0">
        <div class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-800 shadow-sm">
          {#if user?.image}
            <img src={user.image} alt={user.name ?? user.email ?? 'User avatar'} class="h-full w-full object-cover" />
          {:else}
            <span>{avatarLetter}</span>
          {/if}
        </div>
        <CheckCircle2
          class="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white text-emerald-500 shadow-sm"
          aria-hidden="true"
        />
      </div>

      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium text-slate-500">Signed in as</p>
        <p class="text-lg font-semibold text-slate-900">{user?.name ?? user?.email ?? 'Authenticated user'}</p>
        {#if showEmail && user?.email}
          <p class="text-sm text-slate-600">{user.email}</p>
        {/if}
      </div>
    </div>

    <div class="relative mt-6 space-y-3">
      <div class="rounded-xl border border-white/70 bg-white/80 p-4 backdrop-blur">
        <div class="flex items-start gap-3">
          <div class="mt-0.5 rounded-md bg-emerald-50 p-2 text-emerald-600">
            <Sparkles class="h-4 w-4" aria-hidden="true" />
          </div>
          <div class="space-y-1">
            <h2 class="text-base font-semibold leading-6 text-slate-900">{heading}</h2>
            <p class="text-sm text-slate-600">{subheading}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <a
          href={continueHref}
          class="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          {continueLabel}
        </a>

        {#if secondaryHref}
          <a
            href={secondaryHref}
            class="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            {secondaryLabel}
          </a>
        {/if}
      </div>

      {#if footer}
        <div class="pt-2 text-sm text-slate-500">
          {@render footer()}
        </div>
      {/if}
    </div>
  </section>
{:else}
  <div class="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-sm text-slate-600">
    No active session. Render the login success card after authentication completes.
  </div>
{/if}
