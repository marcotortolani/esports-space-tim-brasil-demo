import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import NextCrypto from 'next-crypto'

const crypto = new NextCrypto('user enabled')

const tokenHashID = { name: 'hashID', expireDays: 365 }
const tokenActiveUser = { name: 'enabledUser', expireDays: 1 }
const oneDay = 24 * 60 * 60 * 1000

// CREATE new validation token on cookies
export async function POST(req) {
  const { authValue, hash } = await req.json()

  const encryptedValue = await crypto.encrypt(authValue)

  cookies().set({
    name: tokenActiveUser.name,
    value: encryptedValue,
    expires: Date.now() + oneDay * tokenActiveUser.expireDays,
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  })

  cookies().set({
    name: tokenHashID.name,
    value: hash,
    expires: Date.now() + oneDay * tokenHashID.expireDays,
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  })

  return NextResponse.json({}, { status: 200, statusText: 'Created OK' })
}

// READ a validation token on cookies
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const tokenName = searchParams.get('token')

  const cookieStore = cookies()
  const tokenStored = cookieStore.get(tokenName)

  if (tokenStored === undefined) {
    return NextResponse.json(
      { error: 'error' },
      { status: 400, statusText: `Token: ${tokenName} doesn't exists` }
    )
  }

  const userEnabled = await crypto.decrypt(tokenStored.value).then((res) => {
    return res
  })

  return NextResponse.json(
    { value: userEnabled },
    {
      status: 200,
      statusText: 'Autorizado',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

// UPDATE validation token on cookies
export async function PUT(req) {}

// DELETE validation token on cookies
export async function DELETE(req) {}
