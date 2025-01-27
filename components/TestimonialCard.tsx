import { StarRating } from "./StarRating"

interface TestimonialCardProps {
  name: string
  role: string
  testimonial: string
}

export function TestimonialCard({ name, role, testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="space-y-2 mb-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
        <StarRating />
      </div>
      <p className="text-gray-600">{testimonial}</p>
    </div>
  )
}

