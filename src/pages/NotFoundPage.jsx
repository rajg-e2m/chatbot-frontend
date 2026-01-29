import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
                <Button size="lg">Back to Home</Button>
            </Link>
        </div>
    );
}
