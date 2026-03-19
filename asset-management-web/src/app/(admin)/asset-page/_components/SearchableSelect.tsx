"use client"

import * as React from "react"
import { Check, ChevronDown, Plus, Search } from "lucide-react"
import { Button, cn, Input, Popover, PopoverContent, PopoverTrigger } from "@/libs"

export type SelectOption = {
  value: string
  label: string
}

type CreateFormField = {
  key: string
  label: string
  placeholder: string
  required?: boolean
}

type SearchableSelectProps = {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  createLabel?: string
  className?: string
  /** Create form fields definition */
  createFields?: CreateFormField[]
  /** Called when user submits create form. Returns field values by key. */
  onCreateNew?: (values: Record<string, string>) => Promise<void>
  createLoading?: boolean
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Сонгох",
  searchPlaceholder = "Хайх",
  createLabel = "Шинэ нэмэх",
  className,
  createFields = [],
  onCreateNew,
  createLoading = false,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [openCreateForm, setOpenCreateForm] = React.useState(false)
  const [formValues, setFormValues] = React.useState<Record<string, string>>({})

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

  const handleFieldChange = (key: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [key]: val }))
  }

  const handleCreate = async () => {
    if (!onCreateNew) return
    await onCreateNew(formValues)
    setFormValues({})
    setOpenCreateForm(false)
  }

  const isCreateDisabled =
    createLoading ||
    createFields
      .filter((f) => f.required)
      .some((f) => !formValues[f.key]?.trim())

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

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex flex-col max-h-[350px] overflow-y-auto">
          {/* Search Input */}
          <div className="p-2 border-b flex-shrink-0">
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

          {/* Options List */}
          <div className="flex flex-col max-h-[200px] overflow-y-auto">
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

          {/* Create New — зөвхөн onCreateNew prop өгөгдсөн үед харуулна */}
          {onCreateNew && (
            <div className="border-t p-4 flex-shrink-0">
              <button
                onClick={() => setOpenCreateForm((prev) => !prev)}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium w-full py-1"
              >
                <Plus className="h-4 w-4" />
                {createLabel}
              </button>

              {openCreateForm && (
                <div className="border px-4 py-4 rounded-md flex flex-col gap-4 mt-2 bg-gray-50">
                  {createFields.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <Input
                        placeholder={field.placeholder}
                        value={formValues[field.key] ?? ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      />
                    </div>
                  ))}

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpenCreateForm(false)
                        setFormValues({})
                      }}
                    >
                      Цуцлах
                    </Button>
                    <Button onClick={handleCreate} disabled={isCreateDisabled}>
                      {createLoading ? "Нэмж байна" : "Нэмэх"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}