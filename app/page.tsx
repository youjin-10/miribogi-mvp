import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, History } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-4 mt-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          미리보기
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          미래의 일기를 작성해 보세요.
        </p>

        <div className="w-full space-y-4 mt-4">
          <Link href="/template" className="w-full block">
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                  가이드 템플릿
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  6단계 과정을 따라 미래의 일기를 작성해보세요.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/free-writing" className="w-full block">
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-900/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                  자유롭게 작성
                </h2>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="w-full flex space-x-4">
          <Link href="/guide" className="flex-1 block">
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <CardContent className="py-3 px-4 flex items-center justify-center space-x-2">
                <BookOpen className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  처음이신가요?
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/history" className="flex-1 block">
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <CardContent className="py-3 px-4 flex items-center justify-center space-x-2">
                <History className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  나의 미리보기
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
