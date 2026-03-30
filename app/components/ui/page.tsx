import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const pageVariants = cva("flex min-h-0 flex-1 flex-col gap-6 px-4 py-6", {
  variants: {
    variant: {
      default: "container mx-auto",
      filters: "container mx-auto lg:flex-row lg:gap-0",
      full: "max-w-full",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

function Page({
  className,
  variant = "default",
  ...props
}: VariantProps<typeof pageVariants> & React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page"
      className={cn(pageVariants({ variant }), className)}
      {...props}
    />
  );
}

function PageHeader({
  title,
  description,
  className,
  icon: Icon,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ComponentType<any>;
  children?: React.ReactNode;
}) {
  return (
    <div data-slot="page-header" className={cn(className)} {...props}>
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="text-primary h-5 w-5" />
          </div>
        ) : (
          children
        )}
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function PageContent({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="page-content"
      className={cn("relative flex min-h-0 min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

export { Page, PageContent, PageHeader };
