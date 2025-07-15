import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/placeholder-logo.svg" width={32} height={32} alt="Logo" className="h-8 w-8" />
      <span className="text-lg font-semibold">Acme Inc</span>
    </Link>
  )
}
