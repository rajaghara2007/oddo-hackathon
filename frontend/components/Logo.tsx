import Image from "next/image";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Globe Trotter Logo" 
        fill
        className="object-contain"
      />
    </div>
  );
}
