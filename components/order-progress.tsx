interface OrderProgressProps {
    currentStep: number
    totalSteps?: number
  }
  
  export function OrderProgress({ currentStep, totalSteps = 5 }: OrderProgressProps) {
    return (
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`h-[2px] w-16 ${index + 1 < currentStep ? "bg-primary" : "bg-secondary"}`} />
            )}
          </div>
        ))}
      </div>
    )
  }
  
  