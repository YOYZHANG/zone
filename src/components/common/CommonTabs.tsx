import classNames from "classnames"

interface props {
  tab: string,
}

export const CommonTabs: React.FC<props> = ({tab}) => {
  const options = ['Posts', 'Posts and replies']
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('change', e)
  }

  function handleKeyPress (e: React.KeyboardEvent<HTMLElement>) {
    if (e.code === 'Enter') {
      console.log('Enter key pressed! Input value:', e);
    }
  }
  return (
    <div className="flex w-full">
      {options.map((option) => (
        <div className="flex w-full">
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
