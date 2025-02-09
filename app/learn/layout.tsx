export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
            {children}
        </section>
    );
}
