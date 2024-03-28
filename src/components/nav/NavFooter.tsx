import { useSettingStore } from "../../store/setting"
import { CommonTooltip } from "../common/CommonTooltip"
import { SelectLanguage } from "./SelectLanguage"
import { useTranslation } from "react-i18next"

export const NavFooter: React.FC = () => {
  const {setTheme} = useSettingStore()
  const {t} = useTranslation()

  const toggleDark = () => {
    const root = document.documentElement
    root.classList.toggle("dark")
    setTheme(root.classList.contains("dark") ? "dark" : "light")
  } 
  return (
    <footer className="p4 text-sm text-secondary-light flex flex-col">
      <div className="flex flex-gap2 items-center mb4">
        <CommonTooltip content="toggle theme">
          <button className="flex i-ri:sun-line dark:i-ri:moon-line text-lg" onClick={toggleDark} />
        </CommonTooltip>
        <CommonTooltip content="toggle theme">
          <SelectLanguage />
        </CommonTooltip>
      </div>
      <div> {t('app_desc_short')} </div>
      <div>
        <a href="" target="_blank">Mastodon</a> &middot; <a href="https://github.com/YOYZHANG/zone" target="_blank">GitHub</a>
      </div>
    </footer>
  )
}
