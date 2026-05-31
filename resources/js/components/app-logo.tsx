export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-lg bg-white/10 p-1">
                <img
                    src="/images/logos/logo-without-text-new.webp"
                    alt="Prime Medical Card"
                    className="h-10 w-auto shrink-0 object-contain drop-shadow-md"
                />
            </div>
            <span className="text-base font-bold leading-tight animate-text-shimmer">
                Prime Medical<br />Card
            </span>
        </div>
    );
}
