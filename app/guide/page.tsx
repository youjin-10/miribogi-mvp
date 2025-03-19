"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

export default function GuidePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const guides = [
    {
      title: "미리보기란 무엇인가요?",
      content:
        "미리보기는 당신이 이루고 싶은 미래의 목표나 성취를 마치 이미 이루어진 것처럼 작성하는 방법입니다. 이것은 목표 달성을 시각화하고 그 감정을 미리 경험하는 데 도움이 됩니다.",
      image: "📝",
    },
    {
      title: "어떻게 작성하나요?",
      content:
        "미래의 날짜를 선명하게 설정하고, 실제로 그날을 상상해보세요. 처음엔 어색하겠지만, 구체적으로 그날의 감정과 오감을 최대한 생생히 묘사해보세요. 현실적 제약을 스스로에게 두지 말고, 자유롭게 써보세요.",
      image: "✨",
    },
  ];

  const goToNextStep = () => {
    if (currentStep < guides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Return to home page for selection
      router.push("/");
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const skipToTemplate = () => {
    router.push("/template");
  };

  const skipToFreeWriting = () => {
    router.push("/free-writing");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-md w-full flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={goToPreviousStep}
            className="text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? "홈" : "이전"}
          </Button>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {currentStep + 1} / {guides.length}
          </div>
        </div>

        <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-5xl">{guides[currentStep].image}</div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 text-center">
                {guides[currentStep].title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-center leading-relaxed">
                {guides[currentStep].content}
              </p>

              <div className="flex justify-end w-full mt-6">
                <Button
                  onClick={goToNextStep}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  {currentStep < guides.length - 1 ? (
                    <>
                      다음 <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      완료 <BookOpen className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between w-full mt-4 space-x-4">
          <Button
            variant="outline"
            className="flex-1 border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
            onClick={skipToTemplate}
          >
            템플릿으로 작성하기
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            onClick={skipToFreeWriting}
          >
            자유롭게 작성하기
          </Button>
        </div>
      </div>
    </main>
  );
}
