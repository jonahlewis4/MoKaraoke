"use client";

import React, {ComponentType, JSX, useState} from "react";
import Stepper from "@/utils/components/Stepper";
import {EditorComponent} from "@/utils/components/EditorDefinitions";
import {downloadKInputs, KaraokeLifetime, PartialKaraokeLifetime} from "@/utils/types/KaraokeRequest";
import {AudioStep} from "@/utils/components/AudioStep";
import {BackgroundStep} from "@/utils/components/BackgroundStep";
import {UploadStep} from "@/utils/components/UploadStep";
import {ProcessingStep} from "@/utils/components/ProcessingStep";
import {Header} from "@/utils/components/LinkHeader";


export type Step = {
    label : string;
    editor: EditorComponent;
    preview: ComponentType<{request : KaraokeLifetime}>;
}

const steps: Step[] = [
    AudioStep,
    BackgroundStep,
    ProcessingStep,
    UploadStep,
] as const


export default function CreateVideoLayout(): JSX.Element {
    const [currentStep, setCurrentStep] = useState(0)
    const [karaokiRequest, setKaraokiRequest] = useState<KaraokeLifetime>({
        Inputs: {
            Generate: {
                audioFile: undefined,
                audioUrl: "",
                backgroundFile: undefined,
                backgroundUrl: ""
            },
            Upload: {
                title: "",
                description: "",
                generatedVideoUUID: ""
            }
        },
        Outputs: {
            youtubePath: ""
        },

        audioPreviewUrl: undefined,
        backgroundPreviewUrl: undefined,
    });
    const Editor = steps[currentStep].editor;
    const Preview = steps[currentStep].preview;
    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* Header */}
            {<Header title = "Create Karaoki Video" subtitle = "Need Help?" link = "https://moflo.ai/help" popout = {true}/>}

            {/* Stepper */}
            <Stepper stepLabels={steps.map(step => step.label)} currentStep={currentStep}/>

            {/* Main Layout */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left panel (dynamic content) */}
                <section className="bg-white p-6 rounded-xl shadow">
                    <Editor
                        request = {karaokiRequest}
                        onSave = {(updates : PartialKaraokeLifetime) => {
                            setKaraokiRequest((prev) => ({
                                ...prev,
                                ...updates,
                                Inputs: {
                                    Generate: {
                                        ...prev.Inputs.Generate,
                                        ...updates.Inputs?.Generate
                                    },
                                    Upload: {
                                        ...prev.Inputs.Upload,
                                        ...updates.Inputs?.Upload
                                    }
                                },
                                Outputs: {
                                    ...prev.Outputs,
                                    ...updates.Outputs
                                },
                            }))}}
                        onNext = {() => setCurrentStep((currentStep) => currentStep + 1)}
                    />
                    <button
                        onClick={() => downloadKInputs(karaokiRequest.Inputs)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                    >
                        Download Form Data
                    </button>
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
