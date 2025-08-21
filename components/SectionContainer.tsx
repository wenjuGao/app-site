import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="container mx-auto overflow-x-hidden px-4">{children}</section>
}
