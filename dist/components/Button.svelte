<script lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority';
  import { cn } from '../utils';

  const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 disabled:pointer-events-none disabled:opacity-50 shadow-sm',
    {
      variants: {
        variant: {
          default: 'bg-slate-900 text-white hover:bg-slate-800',
          secondary: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-100',
          outline: 'border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100'
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 px-3',
          lg: 'h-11 px-6'
        }
      },
      defaultVariants: {
        variant: 'default',
        size: 'default'
      }
    }
  );

  const { label = 'Button', variant = 'default', size = 'default', class: className } = $props<{
    label?: string;
    variant?: VariantProps<typeof buttonVariants>['variant'];
    size?: VariantProps<typeof buttonVariants>['size'];
    class?: string;
  }>();
</script>

<button
  type="button"
  class={cn(buttonVariants({ variant, size }), className)}
>
  {label}
</button>
