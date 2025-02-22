import { URLSearchParams } from "url";
import { cookies } from "next/headers";
// import '/envConfig.ts'

export interface collabsType {
  id: number,
  name: string,
  count:number,
  pfp: string | undefined
}

export async function fetchTopContributors<collabsType>() {

  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/collab/top`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    })

  if (!res.ok) {
    throw new Error(`An error occurred: ${res.statusText}`);
  }
  const data: Array<collabsType> = await res.json()

  return data
}