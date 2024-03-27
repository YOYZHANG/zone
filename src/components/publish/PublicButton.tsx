import { useTranslation } from 'react-i18next'
interface Props {
  handleClick: () => void,
}
export const PublishButton: React.FC<Props> = ({handleClick}) => {
  const { t } = useTranslation()
  return (
    <button
      onClick={handleClick}
      className="
        color-primary rounded-full ml-7 flex flex-gap2 flex-center text-primary border-1 border-primary w-9 font-bold py-2
        lg:mx-3 lg:w-auto lg:py-4
        cursor-pointer disabled:pointer-events-none
      "
    >
      <div className="i-ri:pen"></div>
      <span className="hidden lg:block">{t('action.compose')}</span>
    </button>
  )
}
