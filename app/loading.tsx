export default function Loading() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-white dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-purple-600 dark:border-slate-800 dark:border-t-purple-500" />
                <p className="animate-pulse text-sm font-medium text-slate-500 dark:text-slate-400">
                    Loading...
                </p>
            </div>
        </div>
    );
}
