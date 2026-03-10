'use client'
import { useTestQueryQuery } from '@/gql/graphql'
import { Button, Input } from '../libs'


export default function Home() {
  const { data, loading, error, refetch } = useTestQueryQuery()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>


  return (
    <div>
      <Button>asd</Button>
      <Input />
      {data?.testQuery.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.category}</p>
        </div>
      ))}
    </div>
  )
}