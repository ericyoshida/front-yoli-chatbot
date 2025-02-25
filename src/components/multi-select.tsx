import React from 'react'

interface Props {
  options: string[]
  selected: string[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  toggleSelection: (option: string) => void
}

export const MultiSelect = ({
  options,
  selected,
  open,
  setOpen,
  toggleSelection,
}: Props) => {
  return (
    <div className="relative w-full">
      <div
        className="border border-gray-300 rounded-md p-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0 ? `[${selected.join(', ')}]` : 'Selecione...'}
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleSelection(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
