import { Step } from "@/app/mokaraoke/create/page";
import { EditorProps } from "./EditorDefinitions";
import {KaraokeLifetime, PartialKaraokeLifetime} from "@/utils/types/KaraokeRequest";
import React, { useState, ChangeEvent } from "react";
import {uploadFile} from "@/utils/clientHttp/uploadAudioFile";

const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];


export const AudioStep: Step = {
    label: "Audio",
    editor: ({ onNext, onSave }: EditorProps) => {
        const [file, setFile] = useState<File | null>(null);
        // Handle file input change
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const f : File = e.target.files[0];
                if(!validTypes.includes(f.type)){
                    alert("Invalid file type. Please upload an audio file (mp3, wav, mpeg).")
                    return;
                }

                setFile(f);
                // Update the parent with the uploaded file path
                // Here we use file.name as a placeholder path
                const updates: PartialKaraokeLifetime = {
                    Inputs: {
                        Generate: {
                            audioFile: f
                        }
                    },
                };
                onSave(updates); // update parent state
            }
        };

        // Handle submit button
        const handleSubmit = async () => {
            if (!file) {
                alert("Please select an audio file");
                return;
            }


            const audioUrl = await uploadFile(file);
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

                {file && <p>Selected file: {file.name}</p>}

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Next
                </button>
            </div>
        );
    },

    preview: ({request}: { request : KaraokeLifetime }) => {
        if(!request.Inputs.Generate.audioFile) return (
            <p>No audio selected yet.</p>
        )
        const newFileUrl = URL.createObjectURL(request.Inputs.Generate.audioFile!);

        return (
            <div>
                <p>Preview:</p>
                <audio controls src={newFileUrl} className="w-full" style={{ maxWidth: "300px" }} />
            </div>
        );
    }
};
