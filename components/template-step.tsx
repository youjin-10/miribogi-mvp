"use client"

import { Textarea } from "@/components/ui/textarea"

interface TemplateStepProps {
  step: {
    title: string
    question: string
    placeholder: string
    field: string
  }
  value: string
  onChange: (value: string) => void
}

export default function TemplateStep({ step, value, onChange }: TemplateStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{step.title}</h2>
      <p className="text-slate-600 dark:text-slate-300">{step.question}</p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={step.placeholder}
        className="min-h-[200px] text-base p-4 border-slate-200 dark:border-slate-700 focus:border-rose-300 dark:focus:border-rose-700 resize-none"
      />
    </div>
  )
}

