import type { MutationOp } from "@codecanon/nuska";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import type { NuskaDemoReturn } from "@/apps/products-version-control/use-nuska";
import { getType, parseValue } from "@/apps/products-version-control/lib/helpers";
import { IconCheck, IconPencil, IconPlus, IconTrash, IconX } from "@/apps/products-version-control/lib/icons";
import {
  TypeBadge,
  ValueDisplay,
} from "@/apps/products-version-control/components/value-display";

export type PendingOp = MutationOp & { _id: number };
let _uid = 0;
const uid = () => ++_uid;

export function CodeView({ nuska }: { nuska: NuskaDemoReturn }) {
  const [pending, setPending] = useState<PendingOp[]>([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("user");
  const [showAdd, setShowAdd] = useState(false);
  const [addKey, setAddKey] = useState("");
  const [addVal, setAddVal] = useState("");
  const [addType, setAddType] = useState("string");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editKey, setEditKey] = useState("");
  const [editVal, setEditVal] = useState("");
  const [editType, setEditType] = useState("string");
  const editKeyRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const rows = Object.entries(nuska.datasource);

  function stageSet(key: string, value: unknown) {
    setPending((prev) => [
      ...prev.filter((op) => op.key !== key),
      { _id: uid(), type: "set", key, value },
    ]);
  }
  function stageDelete(key: string) {
    setPending((prev) => [
      ...prev.filter((op) => op.key !== key),
      { _id: uid(), type: "delete", key },
    ]);
  }
  function unstage(id: number) {
    setPending((prev) => prev.filter((op) => op._id !== id));
  }

  function commitStageAdd() {
    if (!addKey.trim()) return;
    stageSet(addKey.trim(), parseValue(addVal, addType));
    setAddKey("");
    setAddVal("");
    setAddType("string");
    setShowAdd(false);
  }

  function startEdit(key: string, currentValue: unknown) {
    const t = getType(currentValue);
    const displayType = t === "object" ? "json" : t;
    const raw =
      t === "null"
        ? "null"
        : t === "object"
          ? JSON.stringify(currentValue)
          : String(currentValue);
    setEditingKey(key);
    setEditKey(key);
    setEditType(displayType);
    setEditVal(raw);
    setTimeout(() => editKeyRef.current?.focus(), 0);
  }

  function commitEdit() {
    if (!editingKey) return;
    const newKey = editKey.trim() || editingKey;
    const value = parseValue(editVal, editType);
    if (newKey !== editingKey) {
      // key renamed: delete old, set new
      setPending((prev) => [
        ...prev.filter((op) => op.key !== editingKey && op.key !== newKey),
        { _id: uid(), type: "delete", key: editingKey },
        { _id: uid(), type: "set", key: newKey, value },
      ]);
    } else {
      stageSet(newKey, value);
    }
    setEditingKey(null);
  }

  function cancelEdit() {
    setEditingKey(null);
  }

  async function handleCommit() {
    if (!pending.length || !message.trim()) return;
    const ops: MutationOp[] = pending.map(({ _id, ...op }) => op as MutationOp);
    await nuska.commit(ops, message.trim(), author || "user");
    setPending([]);
    setMessage("");
  }

  const pendingAdditions = pending.filter(
    (op): op is Extract<PendingOp, { type: "set" }> =>
      op.type === "set" && !(op.key in nuska.datasource),
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      {/* Data table */}
      <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card">
        <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/30 px-4 py-2.5">
          <span className="text-sm font-semibold">
            {rows.length} row{rows.length !== 1 ? "s" : ""} ·{" "}
            {nuska.currentBranch}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdd((s) => !s)}
          >
            <IconPlus /> Add row
          </Button>
        </div>

        {showAdd && (
          <div className="flex flex-wrap items-end gap-2 border-b border-fd-border bg-fd-primary/5 px-4 py-3">
            <div className="flex min-w-[80px] flex-1 flex-col gap-1">
              <label className="text-[11px] font-semibold text-fd-muted-foreground">
                Key
              </label>
              <Input
                className="h-7 text-xs"
                placeholder="key"
                value={addKey}
                autoFocus
                onChange={(e) => setAddKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commitStageAdd()}
              />
            </div>
            <div className="flex min-w-[100px] flex-[2] flex-col gap-1">
              <label className="text-[11px] font-semibold text-fd-muted-foreground">
                Value
              </label>
              <Input
                className="h-7 text-xs"
                placeholder="value"
                value={addVal}
                onChange={(e) => setAddVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commitStageAdd()}
              />
            </div>
            <select
              className="h-7 rounded-lg border border-fd-border bg-fd-background px-2 text-xs"
              value={addType}
              onChange={(e) => setAddType(e.target.value)}
            >
              {["string", "number", "boolean", "json", "null"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Button
              size="sm"
              disabled={!addKey.trim()}
              onClick={commitStageAdd}
            >
              Stage
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowAdd(false)}
            >
              <IconX />
            </Button>
          </div>
        )}

        {rows.length === 0 && pendingAdditions.length === 0 ? (
          <div className="py-12 text-center text-sm text-fd-muted-foreground">
            No data yet. Add a row to get started.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-fd-border bg-fd-muted/20">
                <th className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-fd-muted-foreground">
                  Key
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-fd-muted-foreground">
                  Value
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-fd-muted-foreground">
                  Type
                </th>
                <th className="w-16 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([key, value]) => {
                const pDel = pending.find(
                  (op) => op.key === key && op.type === "delete",
                );
                const pSet = pending.find(
                  (op): op is Extract<PendingOp, { type: "set" }> =>
                    op.key === key && op.type === "set",
                );
                const isEditing = editingKey === key;
                return (
                  <tr
                    key={key}
                    className="group/row border-b border-fd-border/50 last:border-0 hover:bg-fd-muted/10"
                    style={pDel ? { opacity: 0.4 } : undefined}
                  >
                    <td className="px-4 py-2.5 font-mono text-xs">
                      {isEditing ? (
                        <Input
                          ref={editKeyRef}
                          className="h-6 text-xs font-mono"
                          value={editKey}
                          onChange={(e) => setEditKey(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              editInputRef.current?.focus();
                            }
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                      ) : (
                        <span style={pDel ? { textDecoration: "line-through" } : undefined}>
                          {key}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            ref={editInputRef}
                            className="h-6 text-xs font-mono"
                            value={editVal}
                            onChange={(e) => setEditVal(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") commitEdit();
                              if (e.key === "Escape") cancelEdit();
                            }}
                          />
                          <select
                            className="h-6 rounded border border-fd-border bg-fd-background px-1 text-xs"
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                          >
                            {["string", "number", "boolean", "json", "null"].map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      ) : pSet ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1 opacity-50 line-through">
                            <span className="text-xs font-bold text-red-500">−</span>
                            <ValueDisplay value={value} />
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-xs font-bold text-green-500">+</span>
                            <ValueDisplay value={pSet.value} />
                          </span>
                        </div>
                      ) : (
                        <ValueDisplay value={value} />
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {!isEditing && <TypeBadge value={pSet ? pSet.value : value} />}
                    </td>
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-green-600 hover:text-green-600 dark:text-green-500"
                            onClick={commitEdit}
                          >
                            <IconCheck />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={cancelEdit}
                          >
                            <IconX />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                          {pDel ? (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => unstage(pDel._id)}
                            >
                              <IconX />
                            </Button>
                          ) : (
                            <>
                              {!pSet && (
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => startEdit(key, value)}
                                >
                                  <IconPencil />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => stageDelete(key)}
                              >
                                <IconTrash />
                              </Button>
                              {pSet && (
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => {
                                    unstage(pSet._id);
                                    startEdit(key, value);
                                  }}
                                >
                                  <IconPencil />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {pendingAdditions.map((op) => (
                <tr
                  key={op._id}
                  className="border-b border-fd-border/50 last:border-0 bg-green-50 dark:bg-green-500/5"
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-green-500">
                    {op.key}
                  </td>
                  <td className="px-4 py-2.5">
                    <ValueDisplay value={op.value} />
                  </td>
                  <td className="px-4 py-2.5">
                    <TypeBadge value={op.value} />
                  </td>
                  <td className="px-4 py-2.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => unstage(op._id)}
                    >
                      <IconX />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Commit panel */}
      <div className="sticky top-4 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
        <div className="border-b border-fd-border bg-fd-muted/30 px-4 py-2.5">
          <span className="text-sm font-semibold">
            {pending.length > 0
              ? `${pending.length} staged change${pending.length !== 1 ? "s" : ""}`
              : "No staged changes"}
          </span>
        </div>
        <div className="p-4">
          {pending.length === 0 ? (
            <p className="text-xs text-fd-muted-foreground">
              Edit or add rows to stage changes, then commit.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                {pending.map((op) => (
                  <div
                    key={op._id}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-xs border-l-2",
                      op.type === "set"
                        ? "bg-green-50 border-green-500 dark:bg-green-500/5"
                        : "bg-red-50 border-red-500 dark:bg-red-500/5",
                    )}
                  >
                    <span
                      className={
                        op.type === "set"
                          ? "font-bold text-green-500"
                          : "font-bold text-red-500"
                      }
                    >
                      {op.type === "set" ? "+" : "−"}
                    </span>
                    <span className="flex-1 truncate font-semibold">
                      {op.key}
                    </span>
                    {op.type === "set" && (
                      <span className="max-w-[60px] truncate text-fd-muted-foreground">
                        {JSON.stringify(op.value)}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => unstage(op._id)}
                    >
                      <IconX />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="h-px bg-fd-border" />

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-fd-muted-foreground">
                    Commit message
                  </label>
                  <Input
                    className="h-7 text-xs"
                    placeholder="Describe your changes…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-fd-muted-foreground">
                    Author
                  </label>
                  <Input
                    className="h-7 text-xs"
                    placeholder="Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    size="sm"
                    disabled={!pending.length || !message.trim()}
                    onClick={handleCommit}
                  >
                    Commit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setPending([])}
                  >
                    Discard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
