import { useTheme } from "next-themes";
import { Link } from "react-router";
import DarkIcon from "@/components/icons/dark-icon";
import DarkText from "@/components/icons/dark-text";
import DefaultIcon from "@/components/icons/default-icon";
import DefaultText from "@/components/icons/default-text";

export function NavbarLogo() {
  return (
    <Link className={"flex flex-1 h-full items-center cursor-pointer"} to={"/"}>
      <NavbarLogoContent />
    </Link>
  );
}

function NavbarLogoContent() {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <>
        <DarkIcon />
        <DarkText className={"max-h-14"} height="100%" />
      </>
    );
  }

  return (
    <>
      <DefaultIcon />
      <DefaultText className={"max-h-14"} height="100%" />
    </>
  );
}
