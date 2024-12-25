'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button className="mt-4 w-full" disabled={pending} type="submit">Log In {
            pending && <span className="animate-spin ml-2">🔄</span>
        }</Button>
    )
}