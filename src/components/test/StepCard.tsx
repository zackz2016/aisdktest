// components/test/StepCard.tsx
import { Card } from '@/components/ui/card'

interface StepCardProps {
  label: string
  onClick: () => void
}
export function StepCard({ label, onClick }: StepCardProps) {
  return (
    <Card
      className="cursor-pointer p-4 text-center hover:bg-gray-100 transition rounded-xl shadow-md"
      onClick={onClick}
    >
      {label}
    </Card>
  )
}
