/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { htmlToText } from '../utils/parse'

describe('html-to-text', () => {
  it('p', () => {
    expect(htmlToText('<p>text inline</p>'))
      .toMatchSnapshot()
  })

  it('p & pre', () => {
    expect(htmlToText('<p>text </p><pre>code</pre>'))
      .toMatchSnapshot()
  })

  it('bold & italic', () => {
    expect(htmlToText('<p>text <b>bold</b> <em>italic</em></p>'))
      .toMatchSnapshot()
  })
})
