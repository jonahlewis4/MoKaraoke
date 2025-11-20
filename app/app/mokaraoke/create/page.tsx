"use client";

import React, {JSX, ReactNode} from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";

export interface StepDefinition {
    label: string;
}

const steps: string[] = [
    "Background",
    "Music",
    "Metadata",
    "Post"
] as const;


export default function CreateVideoLayout(): JSX.Element {
    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Create Karaoki Video</h1>
                <Link href="https://moflo.ai/help" className="text-blue-500 text-sm hover:underline"
                      target="_blank" rel="noopener noreferrer"
                >
                    Need Help?
                </Link>
            </div>

            {/* Stepper */}
            <Stepper stepLabels={steps} currentStep={2} />

            {/* Main Layout */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left panel (dynamic content) */}
                <section className="bg-white p-6 rounded-xl shadow">
                    {/*{props.children}*/}
                </section>

                {/* Right panel (preview) */}
                <aside className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Preview</h2>
                    {/*{props.preview}*/}
                </aside>
            </div>
        </div>
    );
}
