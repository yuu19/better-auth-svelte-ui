<script lang="ts">
  import { cn } from '$lib/utils';
  import { cva, type VariantProps } from 'class-variance-authority';

  const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 disabled:pointer-events-none disabled:opacity-50 shadow-sm',
    {
      variants: {
        variant: {
          default: 'bg-slate-900 text-white hover:bg-slate-800',
          secondary: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-100',
          outline: 'border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100',
          ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
          link: 'text-slate-900 underline-offset-4 hover:underline'
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 px-3',
          lg: 'h-11 px-6',
          icon: 'h-10 w-10'
        }
      },
      defaultVariants: {
        variant: 'default',
        size: 'default'
      }
    }
  );

  const { variant = 'default', size = 'default', class: className, children, type = 'button', ...rest } =
    $props<
      {
        variant?: VariantProps<typeof buttonVariants>['variant'];
        size?: VariantProps<typeof buttonVariants>['size'];
        class?: string;
        type?: 'button' | 'submit' | 'reset';
        children?: () => unknown;
      } & import('svelte/elements').HTMLButtonAttributes
    >();
</script>

<button
  {...rest}
  type={type}
  class={cn(buttonVariants({ variant, size }), className)}
>
  {@render children?.()}
</button>
