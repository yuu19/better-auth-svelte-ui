import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Merge Tailwind classes with conditional clsx-style inputs.
 * Mirrors the shadcn-svelte `cn` helper.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
