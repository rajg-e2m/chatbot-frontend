import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl px-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Smart Lead Generation <br />
                    <span className="text-primary">for E2M Solutions</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Capture qualified leads, answer common questions, and gain valuable insights with our intelligent AI-powered chatbot.
                </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="px-8">Get Started</Button>
                <Button variant="outline" size="lg" className="px-8">View Demo</Button>
            </div>
        </div>
    )
}
