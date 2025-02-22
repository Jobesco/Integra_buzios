'use client'
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputHTMLAttributes, useState, useEffect, useContext } from "react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import { Suspense } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ComponentProps } from "react"
import { HolderContext } from "@/lib/context"
import { fetchPapers, fetchThese } from "../api/papers"


type CriterionProps = {
  name: string
  valueBegin?: Date
  onChangeBegin?: any
  valueEnd?: Date
  onChangeEnd?: any
};


type SearchParams = {
  title: string
  author: string
  keyword: number
  type: number
  place: number
  area: number
  yearEnd: number | undefined
  yearStart: number | undefined
}

function Criterion<T extends InputHTMLAttributes<HTMLInputElement>>(
  { name, ...props }:
    CriterionProps & T) {

  return (
    <div className="flex flex-col px-5 py-3 gap-4">
      <p className="leading-4">{name}</p>
      <Input className="border-2 rounded-2xl border-slate-800 text-xs" {...props} />
    </div>
  )
}

// TODO multiple values for comboboxes
// TODO change to OR, instead of AND 
// ? (how to give priority to AND matches, tho ?)

function ComboBoxCriterion({
  name,
  placeholder,
  onChange,
  value,
  options,
  notFound
}: {
  name: string,
  placeholder: string,
  onChange: any,
  value: string,
  options: Array<{ name: string, id: number }>,
  notFound: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col px-5 py-3 gap-4">
      <p className="leading-4">{name}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between rounded-2xl 
          border-2 border-slate-800 text-xs"
          >
            {value
              ? options.find(({ name }) => name === value)?.name
              : placeholder
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {/* // TODO use cn or whatever to get the width of the button and throw it here */}
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{notFound}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ?
                        ["", 0] : [currentValue, option.id])
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function DateButton<T extends ComponentProps<typeof Button>>(
  { children, selected, ...props }:
    { children: React.ReactNode, selected: boolean } & T) {
  // ? button is a toggle, período is a collapsible

  return (
    <Button className={cn("bg-transparent hover:bg-transparent \
      w-full border-0 justify-start p-0 h-full leading-5 hover:underline",
      selected ? "text-black underline" : "text-grey")} {...props}>
      {children}
    </Button>
  )
}

function IntervalButton<T extends ComponentProps<typeof Button>>(
  { children, selected, ...props }:
    { children: React.ReactNode, selected: boolean } & T) {
  // ? button is a toggle, período is a collapsible

  return (
    <Button className={cn("bg-transparent hover:bg-transparent \
      w-full border-0 justify-start p-0 h-full leading-5 hover:underline",
      selected ? "text-black underline" : "text-grey")} {...props}>
      {children}
    </Button>
  )
}

function DateCriterion<T extends InputHTMLAttributes<HTMLInputElement>>(
  { name, eventTrigger, blockSubmit, ...props }:
    CriterionProps & T & {
      eventTrigger: (callback: (previous: SearchParams) => SearchParams) => void,
      blockSubmit: (callback: ((previous: boolean) => boolean) | boolean) => void
    }) {
  const actualYear = new Date().getFullYear()

  const [chosenYear, setChosenYear] = useState<number>(0)
  const [isInterval, setIsInterval] = useState<boolean>(false)
  const [intervalYear, setIntervalYear] = useState<number>(0)
  const [minValue, setMinValue] = useState<number>(0)

  useEffect(() => {
    if (!isInterval) eventTrigger((previous: SearchParams) => ({
      ...previous, yearEnd: 0, yearStart: 0
    }))
  }, [isInterval])

  useEffect(() => {
    if (isInterval) {
      setMinValue(chosenYear)
    }
  }, [chosenYear])

  return (
    <div className="flex flex-col px-5 py-3 gap-4">
      <p className="leading-4">{name}</p>
      <div className="flex flex-col gap-1 items-start">
        {[actualYear, actualYear - 1, actualYear - 3].map((year) => (
          <DateButton
            key={year}
            onClick={() => {
              const newYear = chosenYear === year ? 0 : year
              console.log(newYear)
              setChosenYear(newYear)
              setIsInterval(false)

              eventTrigger((previous: SearchParams) => ({
                ...previous,
                yearEnd: newYear,
                yearStart: 0,
              }))
            }}
            selected={chosenYear === year}
          >
            Desde {year}
          </DateButton>
        ))}

        <IntervalButton onClick={() => {
          setChosenYear(0)
          setIsInterval((prev) => !prev)
          setIntervalYear(0)
        }}
          selected={isInterval}
        >
          Período específico
        </IntervalButton>

        {isInterval && (
          <div className="flex flex-row gap-3 mt-3">
            <Input
              max={actualYear - 1}
              value={chosenYear}
              onChange={(e) => {
                let newChosenYear = Math.round(Number(e.target.value.replace(/\D/g, "")))
                if (newChosenYear > actualYear - 1) newChosenYear = actualYear - 1
                if (newChosenYear < 0) newChosenYear = 0
                setChosenYear(newChosenYear)
                eventTrigger((previous: SearchParams) => ({
                  ...previous,
                  yearStart: newChosenYear,
                }))
              }}
              className="w-16 h-10 leading-none py-0 border-2 rounded-2xl border-slate-800 text-sm"
            />
            <Input
              max={actualYear}
              value={intervalYear}
              onChange={(e) => {
                // ? only ENABLE search when period is either 0 
                // ? or has 4 numbers and is between valid years
                let newIntervalYear = Math.round(Number(e.target.value.replace(/\D/g, "")))
                const len = newIntervalYear.toString().length

                if (len >= 4) {
                  blockSubmit(false)
                  if (newIntervalYear > actualYear) newIntervalYear = actualYear
                  if (newIntervalYear < minValue) newIntervalYear = minValue
                } else blockSubmit(true)

                setIntervalYear(newIntervalYear)
                eventTrigger((previous: SearchParams) => ({
                  ...previous,
                  yearEnd: newIntervalYear,
                }))
              }}
              className="w-16 h-10 leading-none py-0 border-2 rounded-2xl border-slate-800 text-sm"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Busca({ types, places, areas, keywords }: {
  types: Array<{ type: string, id: number }>,
  places?: Array<{ place_name: string, id: number }>,
  areas: Array<{ area: string, id: number }>,
  keywords: Array<{ name: string, id: number }>
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [truParams, setTruParams] = useState<string>('')
  const paramsOut = new URLSearchParams(searchParams)
  const [search, setSearch] = useState<SearchParams>({
    title: paramsOut.get('title'),
    author: paramsOut.get('author'),
    keyword: +paramsOut.get('keyword'),
    type: +paramsOut.get('type'),
    place: undefined, // ! unused!!!
    area: +paramsOut.get('area'),
    yearEnd: +paramsOut.get('yearEnd'),
    yearStart: +paramsOut.get('yearStart')
  })
  const [searchDisabled, setSearchDisabled] = useState<boolean>(false)

  const { holder, setHolder } = useContext(HolderContext)

  useEffect(() => {
    if (search.keyword || search.type || search.area)
      fetchThese({
        keys: new Set([search.keyword]),
        types: new Set([search.type]),
        areas: new Set([search.area])
      }).then(value => {
        setHolder({
          keyword: value.keys[0],
          type: value.types[0],
          area: value.areas[0]
        })
      })
  }, [])

  useEffect(() => {
    handleSearch()
  }, [search])

  function clearSearch() {
    setSearch({
      title: '',
      author: '',
      keyword: undefined,
      type: undefined,
      place: undefined,
      area: undefined,
      yearEnd: 0,
      yearStart: 0
    })
    setHolder({
      keyword: '',
      type: '',
      place: '',
      area: ''
    })
    setTruParams('')
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    Object.entries(search).forEach(([key, value]) =>
      params.delete(key)
    )
    replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    Object.entries(search).forEach(([key, value]) => {
      if (value !== undefined && value !== null
        && value !== '' && value !== 0
      ) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })
    setTruParams(params.toString())
  }

  function handleClick() {
    handleSearch()
    replace(`${pathname}?${truParams}`)
  }

  return (
    <div className="flex flex-col font-medium rounded-xl shadow-lg w-1/4
      box-border text-black pb-5"
    >
      <div className="flex flex-col w-full">
        <Criterion name="Título"
          placeholder="Insira um título ou parte de um título"
          onChange={(e) => {
            setSearch({ ...search, title: e.target.value })
          }}
          value={search.title ?? ''}
        />
        <Separator className="bg-lightGrey" />
        <Criterion name="Autor"
          placeholder="Insira um ou mais autores"
          onChange={(e) => {
            setSearch({ ...search, author: e.target.value })
          }}
          value={search.author ?? ''}
        />
        <Separator className="bg-lightGrey" />
        <ComboBoxCriterion name="Palavra(s) Chave"
          placeholder="Ex: Design; Inteligência Artificial; ..."
          onChange={([value, id]) => {
            setSearch({ ...search, keyword: id })
            setHolder({ ...holder, keyword: value })
          }}
          value={holder.keyword}
          options={keywords}
          notFound='Sem resultados.'
        />
        <Separator className="bg-lightGrey" />
        <ComboBoxCriterion name="Tipo de Publicação"
          placeholder="Insira um tipo"
          onChange={([value, id]) => {
            setSearch({ ...search, type: id })
            setHolder({ ...holder, type: value })
          }}
          value={holder.type}
          options={types.map(entry => ({
            name: entry.type,
            id: entry.id
          }))}
          notFound='Sem resultados.'
        />
        {places && <><Separator className="bg-lightGrey" />
          <ComboBoxCriterion name="Local de Publicação"
            placeholder="Insira uma universidade"
            onChange={([value, id]) => {
              setSearch({ ...search, place: id })
              setHolder({ ...holder, place: value })
            }}
            value={holder.place}
            options={places.map(entry => ({
              name: entry.place_name,
              id: entry.id
            }))}
            notFound='Sem resultados.'
          /></>}
        <Separator className="bg-lightGrey" />
        <ComboBoxCriterion name="Área Relacionada"
          placeholder="Insira uma área"
          onChange={([value, id]) => {
            setSearch({ ...search, area: id })
            setHolder({ ...holder, area: value })
          }}
          value={holder.area}
          options={areas.map(entry => ({
            name: entry.area,
            id: entry.id
          }))}
          notFound='Sem resultados.'
        />
        <DateCriterion name="Data ou Intervalo"
          eventTrigger={setSearch}
          chosenYear={search.yearEnd}
          intervalYear={search.yearStart}
          blockSubmit={setSearchDisabled}
        />
      </div>
      <div className="flex px-4 pt-4 justify-between">
        <Button className="mx-1 w-2/6 bg-transparent hover:bg-transparent 
          text-blue font-bold" onClick={clearSearch}
        >Limpar Tudo</Button>
        <Button onClick={handleClick} disabled={searchDisabled}
          className="rounded-xl text-white 
          font-bold bg-orange hover:bg-lightGrey w-2/4 px-4">
          Buscar
        </Button>
      </div>

    </div>
  )
}