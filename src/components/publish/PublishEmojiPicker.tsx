import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../drop-down/DropDown"
import Picker from '@emoji-mart/react'


interface Props {
  selectEmoji: (emoji: string) => void
}
export const PublishEmojiPicker: React.FC<Props> = ({selectEmoji}) => {
  // console.log(data)
  const onEmojiSelect = (e: any) => {
    console.log(e)
    selectEmoji(e.native || e.shortcodes)
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="btn-action-icon">
            <div className="i-ri:emotion-line"></div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <Picker onEmojiSelect={onEmojiSelect} theme='light'/>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
