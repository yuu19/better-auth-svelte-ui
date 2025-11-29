<script lang="ts">
  const { label = 'Button', variant = 'primary' } = $props<{
    label?: string;
    variant?: 'primary' | 'secondary';
  }>();

  const variantClasses = variant === 'secondary'
    ? 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50'
    : 'bg-indigo-600 text-white hover:bg-indigo-500';
</script>

<button
  type="button"
  class={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition ${variantClasses}`}
>
  {label}
</button>
