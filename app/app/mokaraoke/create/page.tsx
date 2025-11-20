"use client";

import React, {JSX, ReactNode, useState} from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";
import {EditorComponent} from "@/components/Editor";

type Step = {
    label : string;
    editor: EditorComponent;
    preview: ReactNode;
}

const steps: Step[] = [
    {
        label: "1",
        editor: <div>Editor</div>,
        preview: <div>Preview</div>
    },
    {
        label: "2",
        editor: <div>Editor</div>,
        preview: <div>Preview</div>
    },
    {
        label: "3",
        editor: <div>Editor</div>,
        preview: <div>Preview</div>
    },
    {
        label: "4",
        editor: <div>Editor</div>,
        preview: <div>Preview</div>
    }
] as const


export default function CreateVideoLayout(): JSX.Element {
    const [currentStep, setCurrentStep] = useState(0)
    const Editor = steps[currentStep].editor;
    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* Header */}
            {<Header/>}

            {/* Stepper */}
            <Stepper stepLabels={steps.map(step => step.label)} currentStep={currentStep}/>

            {/* Main Layout */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left panel (dynamic content) */}
                <section className="bg-white p-6 rounded-xl shadow">
                    <Editor onSubmit = {() => setCurrentStep((currentStep) => currentStep + 1)}/>
                </section>

                {/* Right panel (preview) */}
                <aside className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Preview</h2>
                    {steps[currentStep].preview}
                </aside>
            </div>
        </div>
    );
}

function Header() : JSX.Element {
    return <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Create Karaoki Video</h1>
        <Link href="https://moflo.ai/help" className="text-blue-500 text-sm hover:underline"
              target="_blank" rel="noopener noreferrer"
        >
            Need Help?
        </Link>
    </div>;
}