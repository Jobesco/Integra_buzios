// import { NextApiRequest, NextApiResponse } from 'next';
export const revalidate = 10;
import { cookies } from "next/headers";

export async function fetchUserinfo() {
  // const res = await fetch('${process.env.BACK_ENDPOINT}/collab', {
  const res = await fetch(`${process.env.BACK_ENDPOINT}/collab/id/1758`, {
    method: 'GET', cache: 'no-store', credentials: 'include',
    headers: {
      'cookie': cookies().toString(),
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data
}

export async function fetchOwnersFromPids(pids: string[]) {
  const res = await fetch(`${process.env.BACK_ENDPOINT}/owners/`, {
    method: 'POST',
    body: JSON.stringify(pids), credentials: 'include',
    headers: {
      'cookie': cookies().toString(),
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data
}

export interface userData {
  name: string,
  emails: string[],
  profile_pic_url: string
}

export async function sendUserData(userData: userData) {
  const res = await fetch(`${process.env.BACK_ENDPOINT}/collab/`, {
    method: 'POST',
    body: JSON.stringify(userData), credentials: 'include',
    headers: {
      'cookie': cookies().toString(),
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data
}