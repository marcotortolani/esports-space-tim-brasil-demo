import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import NextCrypto from 'next-crypto'

const crypto = new NextCrypto('trial')

const tokenActiveTrial = { name: 'trial', expireDays: 1 }
// CREATE trial token on cookies
export async function POST(req) {
  const { trialValue } = await req.json()

  const encrypted = await crypto.encrypt(trialValue)
  // const decrypted = await crypto.decrypted(encrypt)

  const oneDay = 24 * 60 * 60 * 1000

  cookies().set({
    name: tokenActiveTrial.name,
    value: encrypted,
    expires: Date.now() + oneDay * tokenActiveTrial.expireDays,
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  })

  return NextResponse.json({}, { status: 200, statusText: 'Created OK' })
}

// READ trial token on cookies
export async function GET() {
  const tokenName = tokenActiveTrial.name
  const cookieStore = cookies()
  const tokenStored = cookieStore.get(tokenName)

  if (tokenStored === undefined) {
    return NextResponse.json(
      { error: 'error' },
      { status: 400, statusText: `Token: ${tokenName} doesn't exists` }
    )
  }

  return NextResponse.json(
    { value: tokenStored.value },
    {
      status: 200,
      statusText: 'Autorizado',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
