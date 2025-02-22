'use server'
import { URLSearchParams } from "url";
import { cookies } from "next/headers";
// import '/envConfig.ts'

interface searchParams {
  title?: string,
  author?: string,
  keyword?: string,
  type?: string,
  place?: string,
  area?: string
  yearStart?: string | undefined,
  yearEnd?: string | undefined,
  inverse_order?: string
}

export async function fetchPapers(query?: searchParams,
  currentPage?: number) {
  const params = new URLSearchParams();

  if (query) {
    if (query.title) params.set('title', query.title);
    if (query.author) params.set('author', query.author);
    if (query.keyword) params.set('keyword', query.keyword);
    if (query.type) params.set('type', query.type);
    if (query.place) params.set('place', query.place);
    if (query.area) params.set('area', query.area);
    if (query.yearStart) params.set('dateBegin', query.yearStart);
    if (query.yearEnd) params.set('dateEnd', query.yearEnd);
    if (query.inverse_order) params.set('inverse_order', query.inverse_order)
  }
  params.set('page', currentPage?.toString() ?? '1');

  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/paper?${params.toString()}`,
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
  const [data, total] = await res.json()
  return [data, total]
}

export async function fetchOnePaper(id: number) {
  const params = new URLSearchParams();
  params.set('id', id?.toString());

  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/paperid/?${params.toString()}`,
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
  const data = await res.json()
  return data
}

export async function fetchMostAccessed() {

  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/most-accessed?page=1`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchRecent() {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/recent?page=1`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchKeywords() {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/keyword/`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchTendencies() {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/keyword/top`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}


export async function fetchTypes() {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/types/`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchPlaces() {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/places/`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchAreas() {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/areas/`,
    {
      method: 'GET', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      }
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchFromAreas(ids: Set<number>) {
  const res = await fetch(
    `${process.env.BACK_ENDPOINT}/area/`,
    {
      method: 'POST', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Array.from(ids))
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  const data = await res.json()
  return data
}

export async function fetchThese({keys, types, areas}:{keys: Set<number>, types: Set<number>, areas: Set<number>}) {
  let res = await fetch(
    `${process.env.BACK_ENDPOINT}/keywords/fetch`,
    {
      method: 'POST', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({keys: Array.from(keys)})
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  let data = {keys: await res.json(), types: undefined, areas: undefined}

  res = await fetch(
    `${process.env.BACK_ENDPOINT}/types/fetch`,
    {
      method: 'POST', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({types: Array.from(types)})
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  data = {...data, types: await res.json()}

  res = await fetch(
    `${process.env.BACK_ENDPOINT}/areas/fetch`,
    {
      method: 'POST', cache: 'no-store', credentials: 'include',
      headers: {
        'cookie': cookies().toString(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({areas: Array.from(areas)})
    }
  )
  if (!res.ok) throw new Error(`An error ocurred: ${res.statusText}`)
  data = {...data, areas: await res.json()}


  return data
}