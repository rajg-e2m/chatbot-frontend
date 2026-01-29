import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl px-8">
            <h1 className="text-4xl font-bold">Welcome to Landing Page</h1>
            <p className="text-muted-foreground">This is the landing page placeholder.</p>
            <Button variant="outline">Learn More</Button>
        </div>
    )
}
