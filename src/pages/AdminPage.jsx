import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, TrendingUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const MOCK_LEADS = [
    { id: 1, name: "John Doe", email: "john@example.com", question: "How much does it cost to hire a developer?", intent: "HIGH", timestamp: "2024-05-20 10:00" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", question: "What services do you offer?", intent: "MEDIUM", timestamp: "2024-05-20 11:30" },
    { id: 3, name: "Bob Brown", email: "bob@example.com", question: "Where is your office located?", intent: "LOW", timestamp: "2024-05-20 14:15" },
    { id: 4, name: "Alice Green", email: "alice@example.com", question: "I need a quote for a new website.", intent: "HIGH", timestamp: "2024-05-21 09:45" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", question: "Do you provide SEO services?", intent: "MEDIUM", timestamp: "2024-05-21 13:20" },
];

export default function AdminPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLeads = MOCK_LEADS.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getIntentBadge = (intent) => {
        switch (intent) {
            case "HIGH":
                return <Badge className="bg-destructive hover:bg-destructive/80">High</Badge>;
            case "MEDIUM":
                return <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-500/80 border-none">Medium</Badge>;
            case "LOW":
                return <Badge variant="outline" className="text-muted-foreground">Low</Badge>;
            default:
                return <Badge variant="outline">{intent}</Badge>;
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage and review qualified leads from ChatBot-E2M.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button>Export Leads</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{MOCK_LEADS.length}</div>
                        <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High Intent</CardTitle>
                        <TrendingUp className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{MOCK_LEADS.filter(l => l.intent === "HIGH").length}</div>
                        <p className="text-xs text-muted-foreground">40% of total leads</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">+12% from last week</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Qualified Leads</CardTitle>
                    <CardDescription>
                        A detailed list of users who interacted with the chatbot.
                    </CardDescription>
                    <div className="pt-4 flex items-center max-w-sm relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="max-w-[300px]">Question</TableHead>
                                <TableHead>Intent</TableHead>
                                <TableHead className="text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell className="max-w-[300px] truncate" title={lead.question}>
                                        {lead.question}
                                    </TableCell>
                                    <TableCell>{getIntentBadge(lead.intent)}</TableCell>
                                    <TableCell className="text-right text-muted-foreground text-xs">
                                        {lead.timestamp}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredLeads.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No leads found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
