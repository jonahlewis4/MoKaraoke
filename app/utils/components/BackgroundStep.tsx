"use client";

import React, { useState, ChangeEvent } from "react";
import { Step } from "@/app/mokaraoke/create/page";
import { EditorProps } from "@/utils/components/EditorDefinitions";
import { KaraokeLifetime } from "@/utils/types/KaraokeRequest";
import {LyricWrapper} from "@/utils/components/LyricWrapperProps";
import {uploadFile} from "@/utils/clientHttp/uploadFile";

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
            // Save the updates to parent
            onSave({
                Inputs: {
                    Generate: {
                        backgroundFile: selectedFile
                    }
                }
            });
        };

        const handleNext = async () => {
            if (!file) {
                alert("Please select a background image.");
                return;
            }
            const uuid = await uploadFile(file);
            onSave(({
                Inputs: {
                    Generate: {
                        backgroundId: uuid
                    }
                }
            }))
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

    preview: ({request}: { request : KaraokeLifetime }) => {
        if(request.Inputs.Generate.backgroundFile === undefined) return (
            <p>No background selected yet</p>
        )
        const bgPath = URL.createObjectURL(request.Inputs.Generate.backgroundFile!);
        const lyrics = "Your lyrics will appear here";
        return (
            <div className="flex justify-center">
                <LyricWrapper lyrics={lyrics}>
                    {bgPath ? (
                        <img
                            src={bgPath}
                            className="rounded shadow w-full h-full object-cover"
                         alt={"preview image"}/>
                    ) : null}
                </LyricWrapper>
            </div>
        );
    },
};
