import HomePage from '@/app/components/HomePage'

async function getTemplates() {
  const res = await fetch(process.env.API_URL)
  return res.json()
}

export default async function Home() {
  const templates = await getTemplates()

  return (
    <>
      <HomePage templates={templates} />
    </>
  )
}
