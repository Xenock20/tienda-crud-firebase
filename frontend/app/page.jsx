import Dashboard from "@/components/Dashboard";

export default async function HomePage() {
    return (
        <div className="bg-white m-2 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Dashboard
            ></Dashboard>
        </div>
    );
}
