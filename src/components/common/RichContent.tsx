import parse from 'html-react-parser';
import { useServerInfos } from '../../hooks/serverInfo';
import { Emoji } from 'masto';
import { useRef } from 'react';
import { useAppCookies } from '../../hooks/cookie';

export const RichContent: React.FC<{content: string}> = ({content}) => {
  const {serverURL} = useAppCookies();
  const {serverInfos} = useServerInfos(serverURL as string);

  const emojis = useRef<Record<string, Emoji>>({})
  if (serverInfos && !emojis.current.length) {
    emojis.current = serverInfos[serverURL!]?.customEmojis || {};
  }

  content = content.replace(/:([\w-]+?):/g, (_, name) => {
    const emoji = emojis.current[name]
    if (emoji)
      return `<img src="${emoji.url}" alt="${name}" class="custom-emoji" />`
    return `:${name}:`
  })

  return (
    <div className="rich-content">
      {parse(content)}
    </div>
  )
}
