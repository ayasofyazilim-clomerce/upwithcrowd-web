import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="w-full mt-4" type="submit">Sign Up</Button>
    )
}
