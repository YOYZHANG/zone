import { useEffect, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../drop-down/DropDown"
import type { Picker } from 'emoji-mart'

interface Props {
}
export const PublishEmojiPicker: React.FC<Props> = () => {
  const pickerEl = useRef<HTMLDivElement>(null)
  const picker = useRef<Picker>()

  useEffect(() => {
    (async () => {
      if (!picker.current) {
        const { Picker } = await import('emoji-mart')
        const promise = import('@emoji-mart/data')
        picker.current = new Picker({
          data: () => promise,
          onEmojiSelect: (e: any) => {
            console.log(e.native || e.shortcodes, 'selected emoji')
          },
        })
  
        console.log(picker.current, 'picker.current')
        await new Promise(r => setTimeout(r, 100))  
        pickerEl.current?.appendChild(picker.current as unknown as HTMLElement)
    }})()
  }, [])

  const openEmojiPicker = () => {
    console.error(picker.current, 'picker')
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="btn-action-icon" onClick={openEmojiPicker}>
            <div className="i-ri:emotion-line"></div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuItem className="min-w-10 min-h-10">
            <div ref={pickerEl}></div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
