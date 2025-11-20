import { Step } from "@/app/mokaraoke/create/page";
import { EditorProps } from "./EditorDefinitions";
import { KaraokeRequest } from "@/types/KaraokeRequest";
import React, { useState, ChangeEvent } from "react";

const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];


export const AudioStep: Step = {
    label: "Audio",
    editor: ({ onNext, onSave }: EditorProps) => {
        const [url, setUrl] = React.useState<string | null>(null);
        const [fileName, setFileName] = useState<string | null>(null);
        // Handle file input change
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const newFileUrl = URL.createObjectURL(e.target.files[0]);

                if(!validTypes.includes(e.target.files[0].type)){
                    alert("Invalid file type. Please upload an audio file (mp3, wav, mpeg).")
                    return;
                }

                setUrl(newFileUrl);
                setFileName(e.target.files[0].name);
                // Update the parent with the uploaded file path
                // Here we use file.name as a placeholder path
                const updates: Partial<KaraokeRequest> = {
                    audioPath: newFileUrl,
                };
                onSave(updates); // update parent state
            }
        };

        // Handle submit button
        const handleSubmit = () => {
            if (!url) {
                alert("Please select an audio file");
                return;
            }



            onNext();        // move to next step
        };

        return (
            <div className="flex flex-col space-y-4">
                <label className="font-medium">Upload Audio</label>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />

                {fileName && <p>Selected file: {fileName}</p>}

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Next
                </button>
            </div>
        );
    },

    preview: ({request}: { request : KaraokeRequest }) => {
        if (!request.audioPath) return <p>No audio selected yet.</p>;

        return (
            <div>
                <p>Preview:</p>
                <audio controls src={request.audioPath} className="w-full" style={{ maxWidth: "300px" }} />
            </div>
        );
    }
};
