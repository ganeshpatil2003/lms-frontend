import { Button } from "@/components/ui/button";
import DarkMode from "@/pages/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { LogOut, Menu, School } from "lucide-react";

import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const user = true;
  return (
    <div className="h-16  dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 ">
      {/* desktopNavbar */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full">
        <div className="flex items-center  gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold tex-2xl">E-Learning</h1>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to ="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem className=" bg-purple-400 text-white hover:bg-purple-400">
                  <span className="m-auto">Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* MobileNavbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
      <div className="flex items-center  gap-2">
          
          <h1 className=" font-extrabold tex-4xl">E-Learning</h1>
        </div>
      <MobileNavBar/>
      </div>
    </div>
  );
};

const MobileNavBar = () => {
  const role = "instructor"
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader className="flex flex-row items-center justify-between mt-4">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode/>
        </SheetHeader>
        <Separator className="mx-2"/>
        <nav className="flex flex-col space-y-3">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {
          role === "instructor" && (<SheetFooter>
            <SheetClose asChild>
              <Button>Dashboard</Button>
            </SheetClose>
          </SheetFooter>)
        }
      </SheetContent>
    </Sheet>
  );
};
export default Navbar;