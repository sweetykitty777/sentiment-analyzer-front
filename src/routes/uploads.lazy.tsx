import UploadsList from '@/components/UploadsList'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/uploads')({
  component: UploadsList,
})
