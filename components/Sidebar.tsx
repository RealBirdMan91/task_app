import Card from "./Card";
import Image from "next/image";
import logo from "@/assets/vercel.svg";
import SidebarLink from "./SidebarLink";

type Icon = "Grid" | "Calendar" | "User" | "Settings";
export interface ILink {
  label: string;
  icon: Icon;
  link: string;
}

const links: ILink[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {links.map((link) => (
        <SidebarLink link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
