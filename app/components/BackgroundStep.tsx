"use client";

import React, { useState, ChangeEvent } from "react";
import { Step } from "@/app/mokaraoke/create/page";
import { EditorProps } from "@/components/EditorDefinitions";
import { KaraokeRequest } from "../../types/KaraokeRequest";

export const BackgroundStep: Step = {
    label: "Background",
    editor: ({ onSave, onNext }: EditorProps) => {
        const [file, setFile] = useState<File | null>(null);

        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) return;

            const selectedFile = e.target.files[0];

            // Validation
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSize = 5 * 1024 * 1024; // 5 MB

            if (!validTypes.includes(selectedFile.type)) {
                alert("Invalid file type! Only JPEG, PNG, or GIF allowed.");
                return;
            }

            if (selectedFile.size > maxSize) {
                alert("File too large! Max size is 5 MB.");
                return;
            }

            setFile(selectedFile);

            // Generate a temporary URL for preview
            const url = URL.createObjectURL(selectedFile);

            // Save the updates to parent
            onSave({
                backgroundPath: url, // or eventually uploaded path
            });
        };

        const handleNext = () => {
            if (!file) {
                alert("Please select a background image.");
                return;
            }
            onNext();
        };

        return (
            <div className="flex flex-col space-y-4">
                <label className="font-medium">Upload Background Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
                {file && <p>Selected file: {file.name}</p>}
                <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Next
                </button>
            </div>
        );
    },

    preview: ({request}: { request : KaraokeRequest }) => {
        if (!request.backgroundPath) return <p>No background selected yet</p>;
        return (
            <div className="flex justify-center">
                <img
                    src={request.backgroundPath}
                    alt="Background preview"
                    className="max-w-full max-h-64 object-contain rounded"
                />
            </div>
        );
    },
};
