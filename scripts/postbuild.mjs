import rss from './rss.mjs'
import generateMarkdown from './generate-markdown.mjs'

async function postbuild() {
  await rss()
  await generateMarkdown()
}

postbuild()
