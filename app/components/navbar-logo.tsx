import { CodeCanonIcon, CodeCanonText } from "@codecanon/logos";
import { Link } from "react-router";

export function NavbarLogo() {
  return (
    <Link className={"flex flex-1 h-full items-center cursor-pointer"} to={"/"}>
      <CodeCanonIcon />
      <CodeCanonText className={"max-h-14"} height="100%" />
    </Link>
  );
}
