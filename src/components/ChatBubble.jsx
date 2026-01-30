import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initChat, registerLead, sendMessage } from "../api/chat";
import { Bot, X, Send, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function ChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [threadId, setThreadId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: "How can I help you today?" }
    ]);
    const [isAskingForDetails, setIsAskingForDetails] = useState(false);
    const [detailStep, setDetailStep] = useState(null); // 'name', 'email'
    const [pendingUserMessage, setPendingUserMessage] = useState("");

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isLoading, detailStep]);

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

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { role: 'user', content: text };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage("");

        if (!leadCaptured && !isAskingForDetails) {
            setPendingUserMessage(text);
            setIsAskingForDetails(true);
            setIsLoading(true);

            setTimeout(() => {
                const botMessage = { role: 'assistant', content: "can you please provide your name and email to proceed further" };
                setChatHistory(prev => [...prev, botMessage]);
                setDetailStep('name');
                setIsLoading(false);
            }, 1000);
            return;
        }

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

    const handleDetailSubmit = async (field, value) => {
        if (field === 'name') {
            setFormData(prev => ({ ...prev, name: value }));
            setChatHistory(prev => [...prev, { role: 'user', content: value }]);
            setDetailStep('email');
        } else if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return false;
            }

            setFormData(prev => ({ ...prev, email: value }));
            setChatHistory(prev => [...prev, { role: 'user', content: value }]);
            setDetailStep(null);
            setLeadCaptured(true);
            setIsAskingForDetails(false);

            setIsLoading(true);
            try {
                await registerLead({
                    name: formData.name,
                    email: value,
                    phone: "N/A",
                    thread_id: threadId
                });

                const response = await sendMessage(pendingUserMessage, threadId);
                const answer = response.answer || response.content || "I've received your details. How can I help you further?";
                setChatHistory(prev => [...prev, { role: 'assistant', content: answer }]);
                setPendingUserMessage("");
            } catch (error) {
                console.error("Error finalizing lead/sending message:", error);
                setChatHistory(prev => [...prev, { role: 'assistant', content: "Thanks for providing your details. I'm having trouble connecting right now, but I'll get back to you!" }]);
            } finally {
                setIsLoading(false);
            }
        }
        return true;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <Card className="mb-4 w-[calc(100vw-3rem)] sm:w-96 shadow-2xl border-2 overflow-hidden flex flex-col h-[500px] p-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-black text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                                <Avatar className="h-10 w-10 border-2 border-white/20 bg-white">
                                    <AvatarFallback className="bg-white text-black">
                                        <Bot className="h-6 w-6" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-black rounded-full"></span>
                            </div>
                            <div>
                                <CardTitle className="text-sm font-bold">E2M Assistant</CardTitle>
                                <p className="text-[10px] text-white/80 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white hover:bg-white/20 rounded-full transition-transform hover:rotate-90"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <CardContent
                        ref={scrollRef}
                        className="flex-1 p-4 space-y-4 overflow-y-auto bg-white relative scrollbar-hide"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 8H9M8 7V9' stroke='%23d1d5db' stroke-width='1.5'/%3E%3C/svg%3E")`,
                            backgroundSize: '16px 16px',
                            backgroundPosition: '8px 8px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <style dangerouslySetInnerHTML={{ __html: `
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}} />
                        <AnimatePresence mode="popLayout">
                            {chatHistory.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <Avatar className="h-8 w-8 shrink-0 border shadow-sm">
                                        <AvatarFallback className={cn("text-[10px]", msg.role === 'user' ? "bg-black text-white" : "bg-white text-black")}>
                                            {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={cn(
                                        "max-w-[75%] p-3 px-4 rounded-2xl text-[13px] shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-black text-white rounded-br-none"
                                            : "bg-[#f3f3f3] text-black rounded-bl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {detailStep === 'name' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="flex items-end gap-2 flex-row-reverse"
                                >
                                    <Avatar className="h-8 w-8 shrink-0 border shadow-sm">
                                        <AvatarFallback className="text-[10px] bg-black text-white">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <DetailInputBubble
                                        placeholder="Your Name"
                                        onSubmit={(val) => handleDetailSubmit('name', val)}
                                    />
                                </motion.div>
                            )}

                            {detailStep === 'email' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="flex items-end gap-2 flex-row-reverse"
                                >
                                    <Avatar className="h-8 w-8 shrink-0 border shadow-sm">
                                        <AvatarFallback className="text-[10px] bg-black text-white">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <DetailInputBubble
                                        placeholder="Your Email"
                                        type="email"
                                        onSubmit={(val) => handleDetailSubmit('email', val)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#f3f3f3] p-3 rounded-2xl rounded-tl-none text-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="p-3 bg-white shrink-0">
                        <form
                            className="flex w-full items-center gap-2 bg-[#f3f3f3] rounded-full px-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage(message);
                            }}
                        >
                            <input
                                placeholder="Enter message"
                                className="flex-1 bg-transparent border-none focus:outline-none text-sm py-3 disabled:opacity-50 text-black placeholder:text-gray-600 font-medium"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading || isAskingForDetails}
                            />
                            <button
                                type="submit"
                                className="text-gray-400 hover:text-black transition-colors disabled:opacity-50"
                                disabled={!message.trim() || isLoading || isAskingForDetails}
                                aria-label="Send message"
                            >
                                <Send className="h-5 w-5 rotate-45" />
                            </button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 bg-black text-white hover:bg-black/90"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
            </Button>
        </div>
    );
}

function DetailInputBubble({ placeholder, onSubmit, type = "text" }) {
    const [val, setVal] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!val.trim()) return;
        const success = await onSubmit(val);
        if (!success) {
            setError(true);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "max-w-[80%] p-1 rounded-2xl rounded-br-none bg-black flex items-center gap-1 border-2 transition-colors",
                error ? "border-red-500" : "border-black"
            )}
        >
            <input
                autoFocus
                type={type}
                placeholder={placeholder}
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                    setError(false);
                }}
                className="bg-transparent text-white text-[13px] px-3 py-2 focus:outline-none w-full placeholder:text-gray-400 font-medium"
            />
            <button
                type="submit"
                className="p-1.5 bg-white rounded-full text-black hover:bg-gray-200 transition-colors shrink-0"
            >
                <Check className="h-4 w-4" strokeWidth={3} />
            </button>
        </form>
    );
}
