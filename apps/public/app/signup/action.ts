'use server'
 
import { redirect } from 'next/navigation'
 
export async function createUser<State>(prevState: State, formData: FormData) {
  const res = {
    ok: false,
    json: async () => ({})
  }
//   await for 5 seconds 
    await new Promise(resolve => setTimeout(resolve, 5000))
  const json = await res.json()
 
  if (!res.ok) {
    return { message: 'Please enter a valid email' }
  }
 
  redirect('/dashboard')
}