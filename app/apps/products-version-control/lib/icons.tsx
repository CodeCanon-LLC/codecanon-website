import {
  AlertTriangle,
  Check,
  ChevronDown,
  Database,
  GitBranch,
  GitCommitHorizontal,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

export const IconDB = () => <Database className="size-3.5" />;
export const IconCommit = () => <GitCommitHorizontal className="size-3.5" />;
export const IconPR = () => <GitPullRequest className="size-3.5" />;
export const IconBranch = () => <GitBranch className="size-3.5" />;
export const IconChevron = () => <ChevronDown className="size-3" />;
export const IconCheck = () => <Check className="size-3.5" />;
export const IconTrash = () => <Trash2 className="size-3.5" />;
export const IconX = () => <X className="size-3" />;
export const IconPlus = () => <Plus className="size-3.5" />;
export const IconPencil = () => <Pencil className="size-3.5" />;
export const IconAlert = () => <AlertTriangle className="size-3.5" />;
export const IconPROpen = () => (
  <GitPullRequest className="size-3.5 text-green-500" />
);
export const IconPRMerged = () => (
  <GitMerge className="size-3.5 text-purple-500" />
);
export const IconPRClosed = () => (
  <GitPullRequestClosed className="size-3.5 text-fd-muted-foreground" />
);
