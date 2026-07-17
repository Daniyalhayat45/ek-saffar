import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-basecamp">
      <Image src="/images/logo.png" alt="Ek Safar" width={56} height={56} className="animate-float" />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-basecamp-3">
        <div className="h-full w-1/3 animate-[marquee_1.2s_ease-in-out_infinite] rounded-full bg-orange" />
      </div>
    </div>
  );
}
