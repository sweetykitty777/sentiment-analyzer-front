import { createLazyFileRoute } from '@tanstack/react-router'
import TextCheck from '@/components/TextCheck'

export const Route = createLazyFileRoute('/')({
  component: TextCheck,
})