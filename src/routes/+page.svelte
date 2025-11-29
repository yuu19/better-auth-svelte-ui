<script lang="ts">
  import SignedIn from '$lib/components/SignedIn.svelte';

  type DemoSession = {
    userId: string;
    email: string;
  };

  const demoSession: DemoSession = {
    userId: 'user_123',
    email: 'user@example.com'
  };

  let isSignedIn = $state(true);
  const session = $derived<DemoSession | null>(isSignedIn ? demoSession : null);

  function toggleSession() {
    isSignedIn = !isSignedIn;
  }
</script>

<svelte:head>
  <title>better-auth-svelte-ui</title>
  <meta name="description" content="Better Auth Svelte UI starter" />
</svelte:head>

<main class="content">
  <h1>better-auth-svelte-ui</h1>
  <p>
    This SvelteKit app is ready for building authentication components with Better Auth,
    Tailwind CSS, and shadcn-svelte.
  </p>
  <p>
    Start the dev server with <code>npm run dev</code> and begin iterating in
    <code>src/routes</code>.
  </p>

  <section class="card">
    <h2>Auth/SignedIn demo</h2>
    <p>Toggle the session state to verify the SignedIn component renders protected content.</p>

    <div class="controls">
      <button class="button" type="button" onclick={toggleSession}>
        {isSignedIn ? 'Sign out' : 'Sign in'}
      </button>
      <p class="status">Session: {isSignedIn ? 'Active' : 'None'}</p>
    </div>

    <SignedIn session={session}>
      <p class="protected">Protected content is visible because a session is present.</p>
    </SignedIn>

    {#if !isSignedIn}
      <p class="muted">Activate a session to reveal protected content.</p>
    {/if}
  </section>
</main>

<style>
  main {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0 auto;
    max-width: 720px;
    padding: 2.5rem 1.5rem;
    line-height: 1.6;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  .card {
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    background: #fff;
    box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.05);
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .button {
    background: #111827;
    color: #f9fafb;
    border: none;
    border-radius: 0.5rem;
    padding: 0.55rem 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  .button:hover {
    background: #0b1220;
  }

  .status {
    color: #374151;
    font-weight: 600;
  }

  .protected {
    margin-top: 0.75rem;
    font-weight: 600;
    color: #065f46;
  }

  .muted {
    color: #6b7280;
    margin-top: 0.5rem;
  }
</style>
