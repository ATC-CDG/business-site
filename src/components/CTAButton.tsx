type CTAButtonProps = {
  label: string
  href: string
}

export default function CTAButton({ label, href }: CTAButtonProps) {
  return (
    <a
      href={href}
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {label}
    </a>
  )
}
