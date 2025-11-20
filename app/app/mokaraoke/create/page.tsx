"use client";

import React, {ComponentType, JSX, useState} from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";
import {EditorComponent} from "@/components/EditorDefinitions";
import {KaraokeRequest} from "../../../../types/KaraokeRequest";
import {AudioStep} from "@/components/AudioStep";
import {BackgroundStep} from "@/components/BackgroundStep";
import {TitleStep} from "@/components/TitleStep";
import {UploadStep} from "@/components/UploadStep";


export type Step = {
    label : string;
    editor: EditorComponent;
    preview: ComponentType<{request : KaraokeRequest}>;
}

const steps: Step[] = [
    AudioStep,
    BackgroundStep,
    TitleStep,
    UploadStep,
] as const


export default function CreateVideoLayout(): JSX.Element {
    const [currentStep, setCurrentStep] = useState(0)
    const [karaokiRequest, setKaraokiRequest] = useState<KaraokeRequest>({
        title: "",
        description: "",
        audioPath: "",
        backgroundPath: ""
    });
    const Editor = steps[currentStep].editor;
    const Preview = steps[currentStep].preview;
    console.log(karaokiRequest)
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
                    <Editor
                        onSave = {(updates : Partial<KaraokeRequest>) => {
                            setKaraokiRequest((prev) => ({ ...prev, ...updates }))}}
                        onNext = {() => setCurrentStep((currentStep) => currentStep + 1)}

                    />
                </section>

                {/* Right panel (preview) */}
                <aside className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Preview</h2>
                   <Preview request = {karaokiRequest}/>
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