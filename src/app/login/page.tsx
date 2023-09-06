import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Image src="/Vector9.svg" alt="Ilustração" width={300} height={300} className="absolute top-0 right-0" />
      <Image src="/Vector10.svg" alt="Ilustração" width={300} height={300} className="absolute bottom-0 left-0" />

      <div className="w-1/3 h-96 bg-charcoal ">

      </div>
    </main>
  );
}
