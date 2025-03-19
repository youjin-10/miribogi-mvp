"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";

export default function FreeWritingPage() {
  const router = useRouter();
  const [journal, setJournal] = useState("");

  useEffect(() => {
    const savedJournal = localStorage.getItem("futureLogFreeJournal");
    if (savedJournal) {
      setJournal(savedJournal);
    }
  }, []);

  const handleSave = () => {
    // Save to temporary storage for preview
    localStorage.setItem("futureLogFreeJournal", journal);

    // Save to journals collection
    const title =
      journal.split("\n")[0].substring(0, 50) || "My Future Journal";
    const newJournal = {
      id: Date.now().toString(),
      title,
      content: journal,
      createdAt: Date.now(),
      type: "free",
    };

    // Get existing journals or create empty array
    const existingJournals = localStorage.getItem("futureLogJournals");
    const journals = existingJournals ? JSON.parse(existingJournals) : [];

    // Add new journal and save
    journals.unshift(newJournal);
    localStorage.setItem("futureLogJournals", JSON.stringify(journals));

    // router.push("/preview?source=free");
    router.push("/history");
  };

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
          <div className="text-sm text-slate-500 dark:text-slate-400">
            자유롭게 작성
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/guide")}
            className="text-slate-600 dark:text-slate-300"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            가이드
          </Button>
        </div>

        <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                나의 미리보기
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                나의 미래 일기를 이미 이룬 것처럼 작성해주세요.
              </p>
              <Textarea
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                placeholder="무슨 일이 있나요? 마음껏 작성해 보세요"
                className="min-h-[300px] text-base p-4 border-slate-200 dark:border-slate-700 focus:border-rose-300 dark:focus:border-rose-700 resize-none"
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSave}
                className="bg-rose-500 hover:bg-rose-600 text-white"
                disabled={!journal.trim()}
              >
                작성 완료 <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
