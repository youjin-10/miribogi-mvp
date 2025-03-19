"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Edit, Home, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface JournalEntry {
  id: string
  title: string
  content: string
  createdAt: number
  type: "template" | "free"
}

export default function ViewJournalPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [journal, setJournal] = useState<JournalEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedJournals = localStorage.getItem("futureLogJournals")
    if (savedJournals) {
      const journals = JSON.parse(savedJournals) as JournalEntry[]
      const foundJournal = journals.find((j) => j.id === id)
      if (foundJournal) {
        setJournal(foundJournal)
      }
    }
    setLoading(false)
  }, [id])

  const deleteJournal = () => {
    if (confirm("Are you sure you want to delete this journal?")) {
      const savedJournals = localStorage.getItem("futureLogJournals")
      if (savedJournals) {
        const journals = JSON.parse(savedJournals) as JournalEntry[]
        const updatedJournals = journals.filter((j) => j.id !== id)
        localStorage.setItem("futureLogJournals", JSON.stringify(updatedJournals))
        router.push("/history")
      }
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!journal) {
    return (
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-md w-full flex flex-col items-center space-y-6">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/history")}
              className="text-slate-600 dark:text-slate-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-slate-600 dark:text-slate-300 py-8">Journal not found.</p>
              <Button onClick={() => router.push("/history")} className="bg-rose-500 hover:bg-rose-600 text-white">
                Return to History
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-md w-full flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/history")}
            className="text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="ghost" onClick={() => router.push("/")} className="text-slate-600 dark:text-slate-300">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{journal.title}</h2>

        <div className="w-full flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {format(journal.createdAt, "PPP")}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {format(journal.createdAt, "p")}
          </div>
        </div>

        <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {journal.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between w-full mt-4">
          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
            onClick={deleteJournal}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button
            variant="outline"
            className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
            onClick={() => router.push("/")}
          >
            <Edit className="mr-2 h-4 w-4" />
            New Journal
          </Button>
        </div>
      </div>
    </main>
  )
}

