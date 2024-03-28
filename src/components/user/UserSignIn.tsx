import classNames from 'classnames'
import {FC, useState} from 'react'
import { $fetch } from 'ofetch'
import { useTranslation } from 'react-i18next'

export const UserSignIn: FC = () => {
  const [error, setError] = useState<boolean>(false)
  const [server, setServer] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const { t } = useTranslation()
  const oauth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (busy || !server) {
      return
    }

    setBusy(true)

    if (server) {
      setServer(server.split('/')[0])
    }

    try {
      
      const url = await $fetch<string>(`/api/login?server=${server}`)
      location.href = url
    }
    catch (e){
      console.error(e)
      setError(true)
     
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setServer(value)
    if (value.startsWith('https://'))
      setServer(value.replace('https://', ''))

    if (server?.length)
      setError(false)
  }
  return (
    <div className='dialog-main rounded shadow-lg pointer-events-auto isolate bg-base border-base border-1px border-solid w-full max-h-full of-y-auto overscroll-contain touch-pan-y touch-pan-x py4 px8 max-w-125 modal-animated'>
      <form className='text-center justify-center items-center max-w-150 py6 flex flex-col gap3' onSubmit={oauth}>
        <div className='flex items-center mb2'>
          <img src='/vite.svg' className='w12 h12 mxa' width='48' height='48' alt='logo'/>
          <div className='text-3xl ml2'>{t('action.sign_in')}</div>
        </div>
        <div>
          {t('user.server_address_label')}
        </div>
        <div>
          <div className={classNames('flex bg-gray:10 px4 py2 mxa rounded border border-base focus: outline-none', {
            'border-red-600 dark:border-red-400' : error
          })}>
            <span className="text-secondary-light mr1">https://</span>
            <input
              value={server}
              className="outline-none bg-transparent w-full max-w-50"
              onInput={handleChange}
            />
          </div>
          <div className='min-h-4 '>
            {error && <p className='p-0 m-0 text-xs text-red-600 dark:text-red-400'>
                {t('error.sign_in_error')}
              </p>
            }
          </div>
        </div>
        <div className='text-secondary text-sm flex'>
            <div className='i-ri:lightbulb-line mr-1'></div>
            <span>
            { t('user.tip_no_account') }
              <a href='https://joinmastodon.org/servers' target='_blank' className='hover:underline text-primary'>{ t('user.tip_register_account') }</a>
            </span>
        </div>
        <button className="flex flex-row gap2 items-center btn-solid mt2" disabled={!server || busy}>
          <span className={classNames({
              'inline-block i-ri:login-circle-line': !busy,
              'i-ri:loader-2-fill animate animate-spin': busy
          })}></span>
          { t('action.sign_in') }
        </button>
      </form>
    </div>
  )
}
