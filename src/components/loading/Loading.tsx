import { useTranslation } from 'react-i18next'
interface Props {
}

export const Loading: React.FC<Props> = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center text-center p5 animate-pulse'>
      <div className="op50 i-ri:loader-2-fill animate-spin text-2xl"></div>
      <span className="op50">{t('status.load')}</span>
    </div>
  )
}
