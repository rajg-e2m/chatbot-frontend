import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatBubble() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="absolute bottom-20 right-0">
                    <Card className="w-96 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 border-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-t-lg shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                                <Avatar className="h-11 w-11 border-2 border-primary-foreground/30 shadow-md">
                                    <AvatarFallback className="bg-primary-foreground text-primary flex items-center justify-center">
                                        <Bot className="h-6 w-6" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-primary rounded-full"></span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <CardTitle className="text-base font-bold tracking-tight leading-tight">ChatBot Assistant</CardTitle>
                                <p className="text-xs text-primary-foreground/90 font-medium flex items-center gap-1 mt-0.5">
                                    <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Always active
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/20 rounded-full transition-all hover:rotate-90 flex-shrink-0"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="h-96 p-5 space-y-4 overflow-y-auto bg-muted/30">
                        <div className="flex gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-card border p-3 rounded-2xl rounded-tl-sm text-sm max-w-[75%] shadow-sm">
                                Hello! How can I help you today?
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-background border-t">
                        <div className="relative flex-1">
                            <input
                                placeholder="Type your message..."
                                className="w-full bg-muted border-2 border-border rounded-full px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                            <Button
                                size="icon"
                                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full shadow-md hover:shadow-lg transition-all"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
                </div>
            ) : (
                <Button
                    size="icon"
                    className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-200 bg-gradient-to-br from-primary to-primary/80"
                    onClick={() => setIsOpen(true)}
                >
                    <Bot className="h-7 w-7" />
                </Button>
            )}
        </div>
    );
}
