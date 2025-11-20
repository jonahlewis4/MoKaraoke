import React, {JSX} from "react";

type StepperProps = {
    stepLabels: string[];
    currentStep : number;
}

const Stepper = ({stepLabels, currentStep}:StepperProps) => <div className="flex items-center space-x-6 mb-10">
    {stepLabels.map((stepLabel, index): JSX.Element => (
        <div key={index} className="flex items-center">
            {/* Step circle */}
            <div
                className={[
                    "h-8 w-8 rounded-full flex items-center justify-center font-semibold",
                    index <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-700",
                ].join(" ")}
            >
                {index + 1}
            </div>

            {/* Step label */}
            <span className="ml-2 font-medium">{stepLabel}</span>

            {/* Connector */}
            {index < stepLabels.length - 1 && (
                <div className={["w-10 h-[2px]",
                index < currentStep
                    ? "bg-blue-600"
                    : "bg-gray-300",
                "ml-4"].join(" ")} />
            )}
        </div>
    ))}
</div>

export default Stepper
