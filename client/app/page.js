import HomePage from '../app/components/HomePage'
import { getAllTemplates } from '../api'

export default async function Home() {
  const templates = await getAllTemplates()

  return (
    <>
      <HomePage templates={templates} />
    </>
  )
}
