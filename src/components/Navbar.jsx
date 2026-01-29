import { Link } from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { MessageSquareCode } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2 font-bold text-xl shrink-0">
                    <MessageSquareCode className="w-8 h-8 text-primary" />
                    <span className="hidden sm:inline-block">ChatBot-E2M</span>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/admin">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Admin
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </header>
    );
}
