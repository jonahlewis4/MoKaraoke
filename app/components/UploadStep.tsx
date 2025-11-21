"use client"
import {Step} from "@/app/mokaraoke/create/page";
import {EditorProps} from "@/components/EditorDefinitions";
import React, {useEffect, useState} from "react";
import {KaraokeLifetime} from "@/types/KaraokeRequest";

export const UploadStep: Step = {
    label: "Upload",
    editor: ({ onSave }: EditorProps) => {
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");

        return (
            <div className="flex flex-col space-y-4">
                <label className="font-medium">Video Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        onSave({
                            uploadRequest: {title: e.target.value},
                        })
                    }
                    }
                    className="border p-2 rounded w-full"
                />

                <label className="font-medium">Video Description</label>
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                        onSave({
                            uploadRequest: {description: e.target.value},
                        })
                    }
                    }
                    className="border p-2 rounded w-full"
                    rows={4}
                />
            </div>
        );
    },
    preview: ({ request }: { request: KaraokeLifetime }) => {
        return (
            <div className="max-w-sm border rounded overflow-hidden shadow-lg">
                <video src={request.uploadRequest.generatedVideoPath} controls className="w-full h-48 object-cover"/>

                {/* Video info */}
                <div className="p-4">
                    <h3 className="font-bold text-lg">{request.uploadRequest.title || "Title goes here"}</h3>
                    <p className="text-gray-700 text-sm">
                        {request.uploadRequest.description || "Description goes here"}
                    </p>
                </div>
            </div>
        )
    }
};
