"use client";

import React, { useState } from "react";
import { Step } from "@/app/mokaraoke/create/page";
import { EditorProps } from "@/components/EditorDefinitions";
import { KaraokeRequest } from "../../types/KaraokeRequest";
import {TextHighLightAnimation} from "@/components/TextHighLightAnimation";

export const TitleStep: Step = {
    label: "Title & Description",

    editor: ({ onSave, onNext }: EditorProps) => {
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");

        const handleNext = () => {
            if (!title) {
                alert("Please enter a title");
                return;
            }

            onNext();
        };

        return (
            <div className="flex flex-col space-y-4">
                <label className="font-medium">Video Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                            setTitle(e.target.value)
                            onSave({title: e.target.value})
                        }
                    }
                    className="border p-2 rounded w-full"
                />

                <label className="font-medium">Video Description</label>
                <textarea
                    value={description}
                    onChange={(e) => {
                            setDescription(e.target.value)
                            onSave({description: e.target.value})
                        }
                    }
                    className="border p-2 rounded w-full"
                    rows={4}
                />

                <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-32"
                >
                    Next
                </button>
            </div>
        );
    },

    preview: ({ request }: { request: KaraokeRequest }) => {
        const lyrics = "Your lyrics here".split(" "); // split into words for highlighting

        return (
            <div className="max-w-sm border rounded overflow-hidden shadow-lg">
                {/* YouTube thumbnail */}
                <div className="relative w-full h-48 bg-gray-300 flex items-end justify-start">
                    {request.backgroundPath ? (
                        <img
                            src={request.backgroundPath}
                            alt="Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : null}

                    {/* Karaoke lyrics overlay */}
                    <TextHighLightAnimation lyrics={"Your lyrics will appear here"}/>
                </div>

                {/* Video info */}
                <div className="p-4">
                    <h3 className="font-bold text-lg">{request.title || "Title goes here"}</h3>
                    <p className="text-gray-700 text-sm">
                        {request.description || "Description goes here"}
                    </p>
                </div>
            </div>
        )
    }

}
