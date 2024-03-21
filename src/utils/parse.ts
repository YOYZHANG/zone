import {parse, TEXT_NODE} from 'ultrahtml'
import type { Node } from 'ultrahtml'

export function htmlToText(html: string | undefined | null) {
  if (!html) return ''
  const ast = parse(html)
  return (ast.children as Node[]).map((n) => treeToText(n)).join('').trim()
}

export function decodeHtml(text: string) {
  const decoder = document.createElement('textarea')
  decoder.innerHTML = text
  return decoder.value
}

export function treeToText(input: Node): string {
  let pre = ''
  let body = ''

  if (input.type === TEXT_NODE)
    return decodeHtml(input.value)

  if (input.name === 'br')
    return '\n'

  if (['p', 'pre'].includes(input.name))
    pre = '\n'

  if ('children' in input)
    body = (input.children as Node[]).map(n => treeToText(n)).join('')

  return pre + body
}
