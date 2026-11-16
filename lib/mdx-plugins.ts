import { visit } from 'unist-util-visit'
import { remark } from 'remark'
import GithubSlugger from 'github-slugger'
import yaml from 'js-yaml'
import { sync as probeImageSizeSync } from 'probe-image-size'
import fs from 'fs'

// ---------- mdast-to-string (minimal) ----------
function toString(node: any): string {
  if (node == null) return ''
  if (typeof node !== 'object') return ''
  if ('value' in node) return String(node.value ?? '')
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map((c: any) => toString(c)).join('')
  }
  return ''
}

// ---------- toc headings ----------
export function remarkTocHeadings() {
  const slugger = new GithubSlugger()
  return (tree: any, file: any) => {
    const toc: { value: string; url: string; depth: number }[] = []
    visit(tree, 'heading', (node: any) => {
      const textContent = toString(node)
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
        depth: node.depth,
      })
    })
    file.data.toc = toc
  }
}

export async function extractTocHeadings(markdown: string) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
  return vfile.data.toc
}

// ---------- code title ----------
export function remarkCodeTitles() {
  return (tree: any) =>
    visit(tree, 'code', (node: any, index: number | null, parent: any) => {
      const nodeLang = node.lang || ''
      let language = ''
      let title = ''
      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'))
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length)
      }
      if (!title) return
      const className = 'remark-code-title'
      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      }
      parent.children.splice(index, 0, titleNode)
      node.lang = language
    })
}

// ---------- extract frontmatter ----------
export function remarkExtractFrontmatter() {
  return (tree: any, file: any) => {
    visit(tree, 'yaml', (node: any) => {
      file.data.frontmatter = yaml.load(node.value)
    })
  }
}

// ---------- img to jsx ----------
export function remarkImgToJsx() {
  return (tree: any) => {
    visit(
      tree,
      (node: any) =>
        node.type === 'paragraph' && node.children.some((n: any) => n.type === 'image'),
      (node: any) => {
        const imageNodeIndex = node.children.findIndex((n: any) => n.type === 'image')
        const imageNode = node.children[imageNodeIndex]
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = probeImageSizeSync(
            fs.readFileSync(`${process.cwd()}/public${imageNode.url}`)
          )
          imageNode.type = 'mdxJsxFlowElement'
          imageNode.name = 'Image'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
          ]
          node.type = 'div'
          node.children[imageNodeIndex] = imageNode
        }
      }
    )
  }
}
