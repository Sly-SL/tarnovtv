import type {ComponentProps} from "react";

type BasicInputProps = ComponentProps<"input"> & {
    label?: string;
    error?: string;
};

function BasicInput({ className = "", type, label, error, ...props }: BasicInputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            <input
                type={type}
                data-slot="input"
                multiple
                aria-invalid={!!error}
                className={
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
                    "focus-visible:border-purple-400 focus-visible:ring-3 focus-visible:ring-purple-400 focus-visible:ring-offset-1 focus-visible:ring-offset-background " +
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive " +
                    className
                }
                {...props}
            />
            {error && <p className="text-destructive text-xs mt-1">{error}</p>}
        </div>
    );
}

export { BasicInput };