import { SignJWT, jwtVerify } from 'jose'

export interface JwtPayload {
  sub: string   // user id
  email: string
  role: string
  name: string
}

function getSecret() {
  const config = useRuntimeConfig()
  return new TextEncoder().encode(config.jwtSecret)
}

export async function signToken(payload: JwtPayload): Promise<string> {
  const config = useRuntimeConfig()
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.jwtExpiresIn)
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, getSecret())
  return payload as unknown as JwtPayload
}

export function extractToken(event: any): string | null {
  const authHeader = getRequestHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return null
}
