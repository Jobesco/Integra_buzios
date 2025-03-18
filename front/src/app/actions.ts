'use server'
import { cookies } from "next/headers"

export async function lattesSync(lattes_id: string) {
  const link = `${process.env.BACK_ENDPOINT}/update/lattes/`.concat(lattes_id)
  const res = await fetch(link, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'cookie': cookies().toString(),
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    if (res.status == 404) throw new Error('Inexistent ID')
    else throw new Error('Internal server error')
  }
  const data = await res.json()
  return data
}

export async function updateLID(lid: string, uid: string) {
  const res = await fetch(`${process.env.BACK_ENDPOINT}/collab/`, {
    method: 'PUT',
    body: JSON.stringify({
      id: Number(uid),
      lattes: lid
    }),
    credentials: 'include',
    headers: {
      'cookie': cookies().toString(),
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    throw new Error('failed to fetch protected data')
  }

  const data = await res.json()
  return data
}