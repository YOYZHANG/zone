import classNames from "classnames"

interface props {
  tab: string,
  setTab: (tab: string) => void,
  options: string[]
}

export const CommonTabs: React.FC<props> = ({tab, setTab, options = ['Posts', 'Posts and replies']}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTab(e.target.value)
  }

  function handleKeyPress (e: React.KeyboardEvent<HTMLElement>) {
    if (e.code === 'Enter') {
      console.log(e, 'handleKeyPress')
      // setTab()
    }
  }
  return (
    <div className="flex w-full">
      {options.map((option) => (
        <div className="flex w-full" key={option}>
          <input
            key={option}
            id={`tab-${option}`}
            checked={option === tab}
            value={option}
            type="radio"
            name="tabs"
            className="hidden"
            onChange={handleChange}
          />
          <label
            className={classNames("flex w-full justify-center h-8 cursor-pointer", {
              "color-primary": tab === option,
              "hover:color-purple": tab !== option,
            })}
            tabIndex={1}
            onKeyDown={handleKeyPress}
            htmlFor={`tab-${option}`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}
