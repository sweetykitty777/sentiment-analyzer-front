import Upload from '@/components/uploads/Upload'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/uploads/$uploadId')({
  component: Upload,
})

