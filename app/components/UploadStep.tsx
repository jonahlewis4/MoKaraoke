"use client"
import {Step} from "@/app/mokaraoke/create/page";
import {EditorProps} from "@/components/EditorDefinitions";
import {useEffect, useState} from "react";
import {KaraokeRequest} from "@/types/KaraokeRequest";

export const UploadStep: Step = {
    label: "Upload",
    editor: ({ onSave }: EditorProps) => {
        const [progress, setProgress] = useState(0);
        const [done, setDone] = useState(false);

        useEffect(() => {
            // Simulate processing/upload
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setDone(true);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300); // every 0.3s increase progress
            return () => clearInterval(interval);
        }, []);

        return (
            <div>
                <p className="mb-2">Processing & uploading your video...</p>
                <div className="w-full bg-gray-200 rounded h-4">
                    <div
                        className="bg-blue-600 h-4 rounded"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                {done && (
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Upload to Youtube
                    </button>
                )}
            </div>
        );
    },
    preview: ({ request }: { request: KaraokeRequest }) => {
        if (!request.generatedVideoPath) {
            // Placeholder while processing
            return (
                <div className="h-48 flex items-center justify-center text-gray-500">
                    Video preview will appear here
                </div>
            );
        }

        return (
            <video
                src={request.generatedVideoPath}
                controls
                className="w-full rounded shadow"
            />
        );
    },
};
