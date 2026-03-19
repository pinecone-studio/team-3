"use client"

import * as React from "react"
import { Check, ChevronDown, Plus, Search } from "lucide-react"
import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@/libs"


export type SelectOption = {
  value: string
  label: string
}

type SearchableSelectProps =  {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  onCreate?: (name: string) => void
  createLabel?: string
  className?: string
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Сонгох",
  searchPlaceholder = "Search Categories",
  createLabel = "Create new category",
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])

  const selectedOption = options.find((opt) => opt.value === value)

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue)
    setOpen(false)
    setSearchQuery("")
  }

  const handleCreate = () => {

  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal h-9",
            !value && "text-muted-foreground",
            className
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="flex flex-col">
          {/* Search Input */}
          <div className="p-2 border-b">
            <div className="flex items-center border border-blue-400 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-400">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer hover:bg-muted/50 border-b border-muted last:border-b-0",
                    value === option.value && "bg-muted"
                  )}
                >
                  <span className="flex-1 text-sm font-medium">{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                Олдсонгүй
              </div>
            )}
          </div>
          <div className="border-t px-4 py-2">
            <p className="text-xs text-muted-foreground mb-2">
              Showing {filteredOptions.length} out of {options.length}, type to search for more
            </p>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium w-full py-1"
              >
                <Plus className="h-4 w-4" />
                {createLabel}
              </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
