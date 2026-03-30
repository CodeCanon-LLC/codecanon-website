import type { LayerType } from "@codecanon/waraq/lib";
import { IconUser } from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Helper to parse user data
export function parseUserData(value?: string): User | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed as User;
  } catch {
    return null;
  }
}

export type UserLayerDisplayStyle = "profile" | "name" | "email" | "avatar";
export type UserLayerSize =
  | "x-small"
  | "small"
  | "default"
  | "large"
  | "x-large";

export interface UserLayerData {
  displayStyle: UserLayerDisplayStyle;
  size?: UserLayerSize;
}

// User layer type - displays current logged in user
export const UserLayerType: LayerType<UserLayerData> = {
  id: "user",
  name: "User",
  icon: <IconUser size={16} />,
  render: (layer) => {
    const displayStyle = layer.data?.displayStyle || "profile";
    const size = layer.data?.size || "default";
    const user = parseUserData(layer.value);

    if (!user) {
      return <UserEmptyView />;
    }

    return (
      <div style={layer.contentStyle}>
        {displayStyle === "profile" ? (
          <UserProfileView user={user} size={size} />
        ) : displayStyle === "name" ? (
          user.name
        ) : displayStyle === "email" ? (
          user.email
        ) : (
          <UserAvatarView user={user} size={size} />
        )}
      </div>
    );
  },
  defaultValues: {
    value: JSON.stringify({
      id: "user-1",
      name: "Abdelrahman Salem",
      email: "codecanonllc@gmail.com",
    }),
    cssVars: {
      "--width": "300px",
      "--height": "100px",
    },
    data: {
      displayStyle: "profile",
    },
  },
  keyboardShortcut: {
    description: "Add User",
    keys: ["U"],
    action: (context) => context.addLayer("user"),
    category: "Layer",
  },
};

// CVA Variants for User components
const userProfileVariants = cva("flex size-full items-center overflow-auto", {
  variants: {
    size: {
      "x-small": "gap-2 p-2",
      small: "gap-2 p-3",
      default: "gap-3 p-4",
      large: "gap-4 p-5",
      "x-large": "gap-5 p-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const userNameVariants = cva("truncate font-semibold", {
  variants: {
    size: {
      "x-small": "text-sm",
      small: "text-base",
      default: "text-lg",
      large: "text-xl",
      "x-large": "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const userEmailVariants = cva("truncate", {
  variants: {
    size: {
      "x-small": "text-xs",
      small: "text-xs",
      default: "text-sm",
      large: "text-base",
      "x-large": "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const userAvatarOnlyVariants = cva(
  "flex size-full items-center justify-center overflow-auto",
  {
    variants: {
      size: {
        "x-small": "p-2",
        small: "p-3",
        default: "p-4",
        large: "p-5",
        "x-large": "p-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// Helper to get avatar and icon sizes
function getAvatarSize(size: UserLayerSize = "default") {
  const sizeMap = {
    "x-small": { avatar: 32, icon: 16 },
    small: { avatar: 48, icon: 24 },
    default: { avatar: 64, icon: 32 },
    large: { avatar: 80, icon: 40 },
    "x-large": { avatar: 96, icon: 48 },
  };
  return sizeMap[size];
}

// User Profile View - displays avatar and name
function UserProfileView({
  user,
  size = "default",
}: {
  user: User;
  size?: UserLayerSize;
}) {
  const sizes = getAvatarSize(size);

  return (
    <div className={userProfileVariants({ size })}>
      <div className="shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="rounded-full object-cover"
            style={{
              width: `${sizes.avatar}px`,
              height: `${sizes.avatar}px`,
            }}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: `${sizes.avatar}px`,
              height: `${sizes.avatar}px`,
              backgroundColor: "#f3f4f6",
            }}
          >
            <IconUser size={sizes.icon} style={{ color: "#9ca3af" }} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center overflow-hidden">
        <div className={userNameVariants({ size })}>{user.name}</div>
        <div
          className={userEmailVariants({ size })}
          style={{ color: "#9ca3af" }}
        >
          {user.email}
        </div>
      </div>
    </div>
  );
}

// User Avatar View - displays only the avatar
function UserAvatarView({
  user,
  size = "default",
}: {
  user: User;
  size?: UserLayerSize;
}) {
  const sizes = getAvatarSize(size);

  return (
    <div className={userAvatarOnlyVariants({ size })}>
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="rounded-full object-cover"
          style={{
            width: `${sizes.avatar}px`,
            height: `${sizes.avatar}px`,
          }}
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: `${sizes.avatar}px`,
            height: `${sizes.avatar}px`,
            backgroundColor: "#f3f4f6",
          }}
        >
          <IconUser size={sizes.icon} style={{ color: "#9ca3af" }} />
        </div>
      )}
    </div>
  );
}

// User Empty View
function UserEmptyView() {
  return (
    <div className="flex size-full items-center justify-center">
      <Empty className="p-4!">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-gray-100 text-black">
            <IconUser />
          </EmptyMedia>
          <EmptyTitle className="text-black">No user logged in</EmptyTitle>
          <EmptyDescription className="text-gray-500">
            User information will appear here
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
