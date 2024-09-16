import Dashboard from "@/components/Dashboard";

export default async function HomePage() {
    return (
        <div className="w-3/4 m-auto mt-2 bg-white p-2 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Dashboard/>
        </div>
    );
}
