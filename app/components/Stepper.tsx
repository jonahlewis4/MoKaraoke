import React, {JSX} from "react";
import {StepDefinition} from "@/app/mokaraoke/create/page";

type StepperProps = {
    stepLabels: string[];
    currentStep : number;
}

const Stepper = (p : StepperProps) => <div className="flex items-center space-x-6 mb-10">
    {p.stepLabels.map((stepLabel, index): JSX.Element => (
        <div key={index} className="flex items-center">
            {/* Step circle */}
            <div
                className={[
                    "h-8 w-8 rounded-full flex items-center justify-center font-semibold",
                    index <= p.currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-700",
                ].join(" ")}
            >
                {index + 1}
            </div>

            {/* Step label */}
            <span className="ml-2 font-medium">{stepLabel}</span>

            {/* Connector */}
            {index < p.stepLabels.length - 1 && (
                <div className="w-10 h-[2px] bg-gray-300 ml-4" />
            )}
        </div>
    ))}
</div>

export default Stepper
