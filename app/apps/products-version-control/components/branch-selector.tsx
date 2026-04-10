import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import type { NuskaDemoReturn } from "@/apps/products-version-control/use-nuska";
import {
  IconBranch,
  IconCheck,
  IconChevron,
  IconTrash,
} from "@/apps/products-version-control/lib/icons";

export function BranchSelector({ nuska }: { nuska: NuskaDemoReturn }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");

  async function handleCreate() {
    if (!newName.trim()) return;
    await nuska.branch(newName.trim());
    await nuska.checkout(newName.trim());
    setNewName("");
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-card px-2.5 py-1.5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-muted max-w-[200px]">
          <IconBranch />
          <span className="truncate">{nuska.currentBranch}</span>
          <IconChevron />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-64 p-0 overflow-hidden"
        sideOffset={4}
      >
        <div className="border-b border-fd-border px-3 py-2 text-center text-xs font-semibold text-fd-muted-foreground">
          Switch branches
        </div>
        <div className="max-h-44 overflow-y-auto">
          {nuska.branches.map((b) => (
            <div
              key={b.name}
              className={cn(
                "flex items-center border-b border-fd-border/50 last:border-0",
                b.name === nuska.currentBranch && "bg-fd-primary/5",
              )}
            >
              <button
                className="flex flex-1 items-center gap-2 px-3 py-2 text-left text-sm hover:bg-fd-muted/50"
                onClick={() => {
                  nuska.checkout(b.name);
                  setOpen(false);
                }}
              >
                {b.name === nuska.currentBranch ? (
                  <IconCheck />
                ) : (
                  <span className="w-[13px]" />
                )}
                <span
                  className={cn(
                    "truncate",
                    b.name === nuska.currentBranch &&
                      "font-semibold text-fd-primary",
                  )}
                >
                  {b.name}
                </span>
              </button>
              {b.name !== nuska.currentBranch && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="mr-1 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    nuska.deleteBranch(b.name);
                  }}
                >
                  <IconTrash />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-fd-border p-2">
          <Input
            className="h-7 text-xs"
            placeholder="New branch name…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button size="sm" disabled={!newName.trim()} onClick={handleCreate}>
            Create
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
