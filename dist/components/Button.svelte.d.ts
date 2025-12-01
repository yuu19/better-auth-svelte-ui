import { type VariantProps } from 'class-variance-authority';
declare const Button: import("svelte").Component<{
    label?: string;
    variant?: VariantProps<(props?: ({
        variant?: "default" | "secondary" | "outline" | null | undefined;
        size?: "default" | "sm" | "lg" | null | undefined;
    } & import("class-variance-authority/types").ClassProp) | undefined) => string>["variant"];
    size?: VariantProps<(props?: ({
        variant?: "default" | "secondary" | "outline" | null | undefined;
        size?: "default" | "sm" | "lg" | null | undefined;
    } & import("class-variance-authority/types").ClassProp) | undefined) => string>["size"];
    class?: string;
}, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
