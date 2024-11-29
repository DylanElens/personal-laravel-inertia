import * as React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, LayoutDashboard, User, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import ApplicationLogo from "@/Components/ApplicationLogo";

interface AuthenticatedLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  header,
  children,
}: AuthenticatedLayoutProps) {
  const { auth } = usePage().props as any;
  const user = auth.user;
  const [isOpen, setIsOpen] = React.useState(false);

  const NavLink = ({
    href,
    children,
    active,
    icon: Icon,
  }: {
    href: string;
    children: React.ReactNode;
    active: boolean;
    icon: React.ElementType;
  }) => (
    <SidebarMenuItem>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900",
          active ? "text-gray-900" : "text-gray-500 hover:bg-gray-100",
        )}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    </SidebarMenuItem>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 w-full">
        <Sidebar className="hidden border-r lg:block">
          <SidebarHeader className="border-b px-6 py-4">
            <Link href="/">
              <ApplicationLogo className="h-9 w-auto" />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
                icon={LayoutDashboard}
              >
                Dashboard
              </NavLink>
              <NavLink
                href={route("profile.edit")}
                active={route().current("profile.edit")}
                icon={User}
              >
                Profile
              </NavLink>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2"
                >
                  <span className="h-8 w-8 rounded-full bg-gray-200" />
                  <span className="flex-1 text-left">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col w-full">
          <header className="sticky top-0 z-10 border-b bg-white lg:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/">
                <ApplicationLogo className="h-9 w-auto" />
              </Link>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-2"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="border-b px-6 py-4">
                    <ApplicationLogo className="h-9 w-auto" />
                  </div>
                  <SidebarMenu className="px-2 py-4">
                    <NavLink
                      href={route("dashboard")}
                      active={route().current("dashboard")}
                      icon={LayoutDashboard}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      href={route("profile.edit")}
                      active={route().current("profile.edit")}
                      icon={User}
                    >
                      Profile
                    </NavLink>
                  </SidebarMenu>
                  <div className="border-t p-4">
                    <div className="mb-2 px-2 text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 px-2"
                      asChild
                    >
                      <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="w-full">
            {header && (
              <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  {header}
                </div>
              </header>
            )}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
