'use client'

import { getReceipts } from "@/api-calls/getReceipts"
import { Input } from "@/components/ui/input"
import { useContext } from "react"
import { Context } from "../../Context/Context"
import { useDebouncedCallback } from 'use-debounce'

export function Search() {
  const { setReceipts, setSearchQuery, date} = useContext(Context)

  const searchReceipts = async (e) => {
    setSearchQuery(e.target.value)
    const searchResult = await getReceipts(e.target.value, new Date(date.from).getTime(), new Date(date.to).getTime())
    setReceipts(searchResult.data)
  }

  const debouncedSearch = useDebouncedCallback(searchReceipts, 1000)

  return (
    <Input 
      onChange={debouncedSearch} 
      className="w-full sm:w-1/2" 
      type="text" 
      placeholder="Search for receipts..." 
    />
  )
}
