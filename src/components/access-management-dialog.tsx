import { useState } from "react"
import { X, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AccessItem = {
  id: string
  type: "user"
  name: string
}

// Mock user's organization
const USER_ORGANIZATION = "Acme Inc."

export function AccessManagementDialogComponent() {
  const [accessList, setAccessList] = useState<AccessItem[]>([
    { id: "1", type: "user", name: "john@example.com" },
  ])
  const [userEmail, setUserEmail] = useState("")
  const [shareWithOrg, setShareWithOrg] = useState(false)

  const addUser = () => {
    if (userEmail && !accessList.some(item => item.name === userEmail)) {
      setAccessList(prev => [...prev, { id: Date.now().toString(), type: "user", name: userEmail }])
      setUserEmail("")
    }
  }

  const toggleOrganization = () => {
    setShareWithOrg(prev => !prev)
  }

  const removeAccess = (id: string) => {
    setAccessList(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Access</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Upload Access</DialogTitle>
          <DialogDescription>
            Add users or share with your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Share access</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Input
                  placeholder="User email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={addUser} size="icon" className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start space-x-2 h-10"
                onClick={toggleOrganization}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                  {shareWithOrg ? <Check className="h-3 w-3" /> : null}
                </div>
                <span>Share with {USER_ORGANIZATION}</span>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Current Access:</h4>
            <ul className="space-y-2">
              {accessList.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-md border h-10 px-3"
                >
                  <span className="text-sm">{item.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeAccess(item.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}