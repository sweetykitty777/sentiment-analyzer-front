import { buttonVariants } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: () => 
  <div>
    <h1>Sentiment Analysis</h1>
    <Link className={buttonVariants({ variant: "outline" })}>Login</Link>
    <span>Does not have an account?</span>
    <a href="mailto:help@example.com">Contact us</a>
  </div>
})