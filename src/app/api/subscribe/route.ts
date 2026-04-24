import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json')

function readSubscribers(): string[] {
  try {
    if (!fs.existsSync(subscribersPath)) {
      return []
    }
    const raw = fs.readFileSync(subscribersPath, 'utf8')
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

function appendSubscriber(email: string): void {
  const subscribers = readSubscribers()
  if (!subscribers.includes(email)) {
    const updated = [...subscribers, email]
    fs.writeFileSync(subscribersPath, JSON.stringify(updated, null, 2))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = subscribeSchema.parse(body)

    appendSubscriber(email)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]
      return NextResponse.json(
        { success: false, error: firstIssue?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
