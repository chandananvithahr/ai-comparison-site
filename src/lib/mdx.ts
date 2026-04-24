import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'src', 'content')

export interface MDXFrontmatter {
  title: string
  description: string
  date?: string
  tool1?: string
  tool2?: string
  winner?: string
  category?: string
  [key: string]: unknown
}

export interface MDXContent {
  frontmatter: MDXFrontmatter
  content: string
  slug: string
}

function getFilesInDirectory(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
}

function readMDXFile(filePath: string): MDXContent {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const slug = path.basename(filePath, path.extname(filePath))
  return {
    frontmatter: data as MDXFrontmatter,
    content,
    slug,
  }
}

export function getComparison(slug: string): MDXContent | null {
  const filePath = path.join(contentDirectory, 'comparisons', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readMDXFile(filePath)
}

export function getAllComparisons(): MDXContent[] {
  const files = getFilesInDirectory('comparisons')
  return files.map((file) =>
    readMDXFile(path.join(contentDirectory, 'comparisons', file))
  )
}

export function getToolContent(slug: string): MDXContent | null {
  const filePath = path.join(contentDirectory, 'tools', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readMDXFile(filePath)
}

export function getBestForContent(slug: string): MDXContent | null {
  const filePath = path.join(contentDirectory, 'best-for', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readMDXFile(filePath)
}

export function getAllBestForSlugs(): string[] {
  const files = getFilesInDirectory('best-for')
  return files.map((file) => path.basename(file, path.extname(file)))
}

export function getAllComparisonSlugs(): string[] {
  const files = getFilesInDirectory('comparisons')
  return files.map((file) => path.basename(file, path.extname(file)))
}

export function getAllToolSlugs(): string[] {
  const files = getFilesInDirectory('tools')
  return files.map((file) => path.basename(file, path.extname(file)))
}
