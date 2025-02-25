import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'
import { XIcon } from 'lucide-react'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  forwardRef,
  useState,
} from 'react'

type InputTagsProps = InputProps & {
  value: string[]
  showValues?: boolean
  classname?: string
  onChange: ChangeEventHandler<HTMLInputElement> &
    Dispatch<SetStateAction<string[]>>
}

// eslint-disable-next-line react/display-name
export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, classname, showValues, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState('')

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint])
        onChange(Array.from(newDataPoints))
        setPendingDataPoint('')
      }
    }

    return (
      <>
        <div className="flex ">
          <Input
            value={pendingDataPoint}
            onChange={(e) => setPendingDataPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addPendingDataPoint()
              } else if (e.key === ',' || e.key === ' ') {
                e.preventDefault()
                addPendingDataPoint()
              }
            }}
            className={`rounded-r-none ${classname}`}
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            variant="secondary"
            className="rounded-l-none border border-l-0"
            onClick={addPendingDataPoint}
          >
            Add
          </Button>
        </div>
        {showValues && (
          <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
            {value.map((item: string, idx: number) => (
              <Badge key={idx} variant="secondary">
                {item}
                <button
                  type="button"
                  className="w-3 ml-2"
                  onClick={() => {
                    onChange(value.filter((i: string) => i !== item))
                  }}
                >
                  <XIcon className="w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </>
    )
  },
)
