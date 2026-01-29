import { Button } from "@/components/ui/button"

export default function AdminPage() {
    return (
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl px-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-2">This is the admin page placeholder.</p>
            <div className="flex gap-4">
                <Button>Manage Users</Button>
                <Button variant="secondary">Settings</Button>
            </div>
        </div>
    )
}
