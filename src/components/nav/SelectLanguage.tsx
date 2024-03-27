import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../drop-down/DropDown"
import {locales} from "../../i18n/config"
import { useTranslation } from 'react-i18next';

export const SelectLanguage: React.FC = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><div className="i-ri-global-line text-lg" /></DropdownMenuTrigger>
      <DropdownMenuContent >
        {locales.map((locale) => {
          return (
            <DropdownMenuItem onClick={() => changeLanguage(locale.code)}>
              {locale.name}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
