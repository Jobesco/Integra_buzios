'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { ComponentProps } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useContext, InputHTMLAttributes } from "react"
import { usePathname } from 'next/navigation';
import { HolderContext } from "@/lib/context"

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

function MiniCriterion<T extends InputHTMLAttributes<HTMLInputElement>>(
  { name, ...props }:
    CriterionProps & T) {

  return (
    <div className="flex flex-col font-bold text-grey5 text-md gap-3">
      <p className="leading-4 indent-4">{name}</p>
      <Input className="text-center rounded-full bg-white 
        text-sm" {...props} />
    </div>
  )
}

function MiniComboBoxCriterion({
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
  value: string
  options: Array<{ name: string, id: number }>,
  notFound: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col font-bold text-grey5 text-ml gap-3">
      <p className="leading-4 indent-4">{name}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white text-sm 
              text-center rounded-full"
          >
            {value
              ? options.find(({name}) => name === value)?.name
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

export default function MiniSearch({ types, places, areas, keywords }: {
  types: Array<{ type: string, id: number }>,
  places?: Array<{ place_name: string, id: number }>,
  areas: Array<{ area: string, id: number }>,
  keywords: Array<{ name: string, id: number }>
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [truParams, setTruParams] = useState<string>('')
  const paramsOut = new URLSearchParams(searchParams)
  const [search, setSearch] = useState<SearchParams>({
    title: paramsOut.get('title'),
    author: '',
    keyword: undefined,
    type: undefined,
    place: undefined,
    area: undefined,
    yearEnd: undefined,
    yearStart: undefined
  })

  const { holder, setHolder } = useContext(HolderContext)

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    Object.entries(search).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })
    setTruParams(params.toString())
  }

  useEffect(() => {
    handleSearch()
  }, [search])

  function handleClick() {
    handleSearch()
    replace(`trabalhos?${truParams}`)
  }

  return (
    <div className="[&:not(:first-child)]:mt-12 flex-row rounded-2xl
        justify-center flex self-center gap-6 bg-white/75 py-9 px-6
        items-center">
      <MiniCriterion name="Título" placeholder="Busque por um título"
        onChange={(e) => {
          setSearch({ ...search, title: e.target.value })
        }} value={search.title ?? ''} />
      <MiniCriterion name="Autor / E-mail" placeholder="Autor/E-mail" 
        onChange={(e) => {
          setSearch({ ...search, author: e.target.value })
        }} value={search.author ?? ''} />
      <MiniComboBoxCriterion name="Palavra(s) Chave"
        placeholder="Insira ou selecione uma palavra chave"
        onChange={([value, id]) => {
          setSearch({ ...search, keyword: id })
          setHolder({ ...holder, keyword: value })
        }}
        value={holder.keyword}
        options={keywords}
        notFound='Sem resultados.'
      />
      <MiniComboBoxCriterion name="Tipo(s) de Publicação"
        placeholder="Insira ou selecione um tipo"
        onChange={([value, id]) => {
          setSearch({ ...search, type: id })
          setHolder({ ...holder, type: value })
        }}
        value={holder.type}
        notFound='Sem resultados.'
        options={types.map(entry => ({
          name: entry.type,
          id: entry.id
        }))}
      />
      
      <Button className="rounded-full font-bold text-lg bg-orange 
        px-12 py-6 hover:bg-darkOrange"
        onClick={handleClick}
      >
        Buscar
      </Button>
    </div>
  )
}