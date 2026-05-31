export default function BrandLogo() {
    return (
        <a href="#" className="logo" aria-label="برايم ميديكال كارد">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                    <img
                        src="/images/logos/logo-without-text-new.webp"
                        alt="برايم ميديكال كارد"
                        className="h-14 w-auto object-contain drop-shadow-md lg:h-16"
                        loading="eager"
                        decoding="async"
                    />
                </div>
                <span className="text-lg font-bold animate-text-shimmer lg:text-xl">
                    Prime Medical Card
                </span>
            </div>
        </a>
    );
}
