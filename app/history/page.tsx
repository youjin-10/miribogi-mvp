"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  type: "template" | "free";
}

export default function HistoryPage() {
  const router = useRouter();
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedJournals = localStorage.getItem("futureLogJournals");
    if (savedJournals) {
      setJournals(JSON.parse(savedJournals));
    }
    setLoading(false);
  }, []);

  const getPreviewText = (content: string) => {
    // Get first 100 characters as preview
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };

  const viewJournal = (id: string) => {
    router.push(`/view/${id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-md w-full flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />홈
          </Button>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            나의 미리보기 기록
          </h1>
        </div>

        {journals.length === 0 ? (
          <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-slate-600 dark:text-slate-300 py-8">
                아직 나의 미리보기를 작성하지 않았어요.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                나의 미리보기를 작성해 보세요
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full space-y-4">
            {journals.map((journal) => (
              <Card
                key={journal.id}
                className="w-full border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => viewJournal(journal.id)}
              >
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {journal.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                    {getPreviewText(journal.content)}
                  </p>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(journal.createdAt, {
                        addSuffix: true,
                      })}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {journal.type === "template" ? "템플릿" : "자유 작성"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
