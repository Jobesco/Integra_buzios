'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { fixTitle } from "@/lib/utils"

interface CategoryChild {
  keyword: {
    name: string
  }
}

export default function Categories({ children, ...props }:
  React.HTMLAttributes<HTMLDivElement> & {
    children: CategoryChild[]
  }) {

  return (
    <div className={cn(props.className,
      'flex items-center justify-start gap-2')}>
      {children?.map((child, index) =>
        <Category key={index} title={child?.keyword.name} />
      )}
    </div>
  )
}

function Category({ title, ...props }: {
  title: string
}) {

  return (
    <Button className="h-full py-2 px-4 text-grey font-normal text-md 
      bg-catButton hover:bg-grey3">
      {fixTitle(title)}
    </Button>
  )
}