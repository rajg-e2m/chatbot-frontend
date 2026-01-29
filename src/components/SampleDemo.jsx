import { Button } from "@/components/ui/button"

export function SampleDemo() {
    return (
        <div className="flex flex-col gap-4 p-8 items-center">
            <h2 className="text-2xl font-bold mb-4">Shadcn Button Variants</h2>

            <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Default</span>
                    <Button>Default Button</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Destructive</span>
                    <Button variant="destructive">Destructive</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Outline</span>
                    <Button variant="outline">Outline</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Secondary</span>
                    <Button variant="secondary">Secondary</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Ghost</span>
                    <Button variant="ghost">Ghost</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Link</span>
                    <Button variant="link">Link</Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Size SM</span>
                    <Button size="sm">Small</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Size LG</span>
                    <Button size="lg">Large</Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Icon</span>
                    <Button size="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    )
}
