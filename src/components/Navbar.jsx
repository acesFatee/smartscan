"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, User, Settings, LogOut, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar({ user }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full flex fixed justify-center border-b backdrop-blur-3xl">
      <nav className="max-w-5xl w-full px-4 py-2">
        <div className="flex h-16 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-200 dark:hover:bg-gray-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white dark:bg-black">
              <div className="grid gap-4 py-4">
                <Link href="/" className="text-lg font-medium hover:text-gray-500 dark:hover:text-gray-400">
                  Home
                </Link>
                <Link href="/receipts" className="text-lg font-medium hover:text-gray-500 dark:hover:text-gray-400">
                  View Receipts
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-4 md:ml-0">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-black dark:text-white">
              Smartscan
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:flex md:items-center md:gap-6">
              <Link href="/" className="text-sm font-medium text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400">
                Home
              </Link>
              <Link href="/receipts" className="text-sm font-medium text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400">
                View Receipts
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <Sun className="h-10 w-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-10 w-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                  <img
                    src={user.picture}
                    alt="Avatar"
                    className="rounded-full"
                    height={32}
                    width={32}
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-black">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span className="w-full">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="w-full">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <LogoutLink className="w-full">Log out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
}
