import parse from 'html-react-parser';
import { DEFAULT_SERVER } from '../../constants';
import { useServerInfos } from '../../hooks/serverInfo';
import { Emoji } from 'masto';
import { useRef } from 'react';

export const RichContent: React.FC<{content: string}> = ({content}) => {
  const {serverInfos} = useServerInfos(DEFAULT_SERVER);

  const emojis = useRef<Record<string, Emoji>>({})
  if (serverInfos && !emojis.current.length) {
    emojis.current = serverInfos[DEFAULT_SERVER]?.customEmojis || {};
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
