import HomePage from '../_components/HomePage'
import { getAllTemplates } from '../../api'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const token = session?.user?.token
  const templates = await getAllTemplates(token)

  return (
    <>
      <HomePage templates={templates} />
    </>
  )
}
