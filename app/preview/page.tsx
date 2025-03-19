"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Share2 } from "lucide-react";

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const [journalContent, setJournalContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (source === "template") {
      const savedAnswers = localStorage.getItem("futureLogAnswers");
      if (savedAnswers) {
        const answers = JSON.parse(savedAnswers);
        const content = formatTemplateJournal(answers);
        setJournalContent(content);
      }
    } else if (source === "free") {
      const freeJournal = localStorage.getItem("futureLogFreeJournal");
      if (freeJournal) {
        setJournalContent(freeJournal);
      }
    }
    setLoading(false);
  }, [source]);

  const formatTemplateJournal = (answers: any) => {
    return `# ${answers.date}의 미리보기
${answers.goal}
${answers.feelings}
${answers.challenges}
${answers.changes}
${answers.description} 내가 지금 느끼는 이 기분을 예전의 나에게 꼭 전하고 싶다. 그리고 이렇게 말해줘야지.
"${answers.sentence}"
`;
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
            onClick={() =>
              source === "template"
                ? router.push("/template")
                : router.push("/free-writing")
            }
            className="text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-slate-600 dark:text-slate-300"
          >
            <Home className="mr-2 h-4 w-4" />홈
          </Button>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          나의 미리보기
        </h2>

        <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {journalContent.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 text-slate-700 dark:text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-4 w-full">
          <Button
            variant="outline"
            className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
          >
            <Share2 className="mr-2 h-4 w-4" />
            공유하기
          </Button>
          <Button
            onClick={() => router.push("/history")}
            variant="outline"
            className="border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            나의 모든 미리보기
          </Button>
        </div>
      </div>
    </main>
  );
}
