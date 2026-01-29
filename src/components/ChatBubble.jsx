import { useState, useEffect } from "react";
import { initChat, registerLead, sendMessage } from "../api/chat";
import { Bot, X, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [threadId, setThreadId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const initialize = async () => {
            let currentThreadId = localStorage.getItem("chat_thread_id");
            if (!currentThreadId) {
                currentThreadId = crypto.randomUUID();
                localStorage.setItem("chat_thread_id", currentThreadId);
            }
            setThreadId(currentThreadId);
            try {
                await initChat(currentThreadId);
            } catch (error) {
                console.error("Failed to init chat:", error);
            }
        };
        initialize();
    }, []);

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            setIsLoading(true);
            try {
                await registerLead({
                    ...formData,
                    phone: "N/A",
                    thread_id: threadId
                });
                setLeadCaptured(true);
            } catch (error) {
                console.error("Error registering lead:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { role: 'user', content: text };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage("");
        setIsLoading(true);

        try {
            const response = await sendMessage(text, threadId);
            const botMessage = { role: 'assistant', content: response.answer };
            setChatHistory(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            setChatHistory(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <Card className="mb-4 w-[calc(100vw-3rem)] sm:w-96 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 border-2 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-primary text-primary-foreground">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                                <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                                    <AvatarFallback className="bg-primary-foreground text-primary">
                                        <Bot className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-primary rounded-full"></span>
                            </div>
                            <div>
                                <CardTitle className="text-sm font-semibold">E2M Assistant</CardTitle>
                                <p className="text-[10px] text-primary-foreground/80 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full transition-transform hover:rotate-90"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    {!leadCaptured ? (
                        <>
                            <CardContent className="p-6 space-y-4 bg-muted/5">
                                <div className="space-y-2">
                                    <CardTitle className="text-lg">Welcome!</CardTitle>
                                    <CardDescription>Please provide your details to start the conversation.</CardDescription>
                                </div>
                                <form id="lead-form" onSubmit={handleLeadSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your Name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="p-4 border-t bg-background">
                                <Button form="lead-form" type="submit" className="w-full">Start Chatting</Button>
                            </CardFooter>
                        </>
                    ) : (
                        <>
                            <CardContent className="h-80 p-4 space-y-4 overflow-y-auto bg-muted/10">
                                <div className="flex gap-2">
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                                            <Bot className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%] shadow-sm">
                                        Hello {formData.name.split(' ')[0]}! How can I help you with E2M Solutions today?
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pl-1">Suggested Questions</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "What services do you offer?",
                                            "How much does it cost?",
                                            "Tell me about E2M",
                                        ].map((faq) => (
                                            <button
                                                key={faq}
                                                className="text-left text-xs bg-background border hover:border-primary hover:text-primary transition-colors px-3 py-2 rounded-xl shadow-sm"
                                                onClick={() => handleSendMessage(faq)}
                                            >
                                                {faq}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4 pt-4 border-t">
                                    {chatHistory.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                    : 'bg-muted rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm animate-pulse">
                                                Thinking...
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="p-3 bg-background border-t">
                                <form
                                    className="flex w-full items-center gap-2"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage(message);
                                    }}
                                >
                                    <Input
                                        placeholder="Type your message..."
                                        className="flex-1 rounded-full px-4"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="h-9 w-9 rounded-full shrink-0"
                                        disabled={!message.trim()}
                                        aria-label="Send message"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </>
                    )}
                </Card>
            )}

            <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
            </Button>
        </div>
    );
}
