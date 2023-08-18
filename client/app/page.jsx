import HomePage from '../components/HomePage'
import { getAllTemplates } from '../api'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const templates = await getAllTemplates()
  const session = await getServerSession()
  const userName = session.user.name

  return (
    <>
      <HomePage templates={templates} userName={userName} />
    </>
  )
}
