"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, HelpCircle } from "lucide-react";
import TemplateStep from "@/components/template-step";
import { TemplateAnswers } from "@/types";

interface Step {
  title: string;
  question: string;
  placeholder: string;
  field: string;
}

export default function TemplatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<TemplateAnswers>({
    date: "",
    goal: "",
    feelings: "",
    challenges: "",
    changes: "",
    description: "",
    sentence: "",
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem("futureLogAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const steps: Step[] = [
    {
      title: "오늘의 날짜는 언제인가요?",
      question:
        "이 목표가 이루어질 미래의 날짜를 적어보세요. 명확한 날짜가 정해지면 상상이 더 잘 될거에요.",
      placeholder: "2026년 12월 31일",
      field: "date",
    },
    {
      title: "오늘 어떤 목표가 이루어졌나요?",
      question:
        "크고 작은 목표 모두 괜찮습니다. 원하는 것이 실제로 이루어진 상황을 구체적으로 적어보세요.",
      placeholder: "내 책이 베스트셀러가 되어 서점에 진열되었다.",
      field: "goal",
    },
    {
      title: "이 목표가 이루어진 기분은 어떤가요?",
      question:
        "설렘, 뿌듯함, 기쁨 등, 그 목표가 이루어진 순간의 기분을 떠올리며 생생하게 표현해보세요.",
      placeholder: "너무 설레고 뿌듯하다. 믿기지가 않는다.",
      field: "feelings",
    },
    {
      title: "이 일이 이루어지기까지 어떤 일들이 있었나요?",
      question:
        "목표를 이루기 위해 했던 노력이나 에피소드를 써보세요. 구체적일수록 좋아요.",
      placeholder:
        "처음 원고를 쓸 때는 자신이 없었지만, 꾸준히 매일 아침 글을 써나갔다.",
      field: "challenges",
    },
    {
      title: "목표를 달성한 지금, 내 삶은 어떻게 달라졌나요?",
      question:
        "삶의 어떤 부분이 바뀌었는지 자유롭게 표현해 보세요. 몸과 마음, 생활 습관, 관계의 변화 모두 좋아요.",
      placeholder:
        "작가로서의 자신감이 생겼고, 다음 책을 준비하며 더 큰 꿈을 꿀 수 있게 되었다.",
      field: "changes",
    },
    {
      title: "지금 보고, 듣고, 느끼는 것을 자세히 묘사해 보세요.",
      question:
        "목표가 이루어진 순간의 주변 환경을 오감을 활용하여 최대한 생생하게 써 보세요.",
      placeholder:
        "내 책이 서점 베스트셀러 진열대에 놓여있는 모습이 보인다. 서점에서 흐르는 배경 음악, 사람들이 내 책을 이야기하며 지나가는 소리가 들린다....",
      field: "description",
    },
    {
      title:
        "목표를 이룬 오늘의 내가, 현재를 살아가는 나에게 해주고 싶은 말은?",
      question:
        "미래의 내가 지금의 나에게 응원과 위로, 격려가 되는 말을 짧게 써보세요.",
      placeholder:
        "힘들더라도 포기하지 말고 꾸준히 글을 써줘서 고맙다. 네가 할 수 있다는 걸 잊지마!...",
      field: "sentence",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Save completed journal
      const journalContent = formatTemplateJournal(answers);
      saveCompletedJournal(journalContent);
      router.push("/preview?source=template");
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Save to localStorage whenever answers change
  const saveToLocalStorage = () => {
    localStorage.setItem("futureLogAnswers", JSON.stringify(answers));
  };

  // Format the template answers into a journal
  const formatTemplateJournal = (answers: TemplateAnswers) => {
    return `# ${answers.date}의 미리보기
${answers.goal}
${answers.feelings}
${answers.challenges}
${answers.changes}
${answers.description} 내가 지금 느끼는 이 기분을 예전의 나에게 꼭 전하고 싶다. 그리고 이렇게 말해줘야지.
"${answers.sentence}"
`;
  };

  // Save the completed journal to localStorage
  const saveCompletedJournal = (content: string) => {
    const title = answers.goal || "My Future Achievement";
    const newJournal = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now(),
      type: "template",
    };

    // Get existing journals or create empty array
    const existingJournals = localStorage.getItem("futureLogJournals");
    const journals = existingJournals ? JSON.parse(existingJournals) : [];

    // Add new journal and save
    journals.unshift(newJournal);
    localStorage.setItem("futureLogJournals", JSON.stringify(journals));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-md w-full flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() =>
              currentStep === 0 ? router.push("/") : goToPreviousStep()
            }
            className="text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? "홈" : "이전"}
          </Button>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Step {currentStep + 1} of {steps.length}
          </div>
          {currentStep === 0 && (
            <Button
              variant="ghost"
              onClick={() => router.push("/guide")}
              className="text-slate-600 dark:text-slate-300"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              가이드
            </Button>
          )}
        </div>

        <Card className="w-full border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-6">
            <TemplateStep
              step={steps[currentStep]}
              value={answers[steps[currentStep].field]}
              onChange={(value) =>
                handleInputChange(steps[currentStep].field, value)
              }
            />

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => {
                  saveToLocalStorage();
                  goToNextStep();
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                {currentStep < steps.length - 1 ? (
                  <>
                    다음 <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Complete <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
