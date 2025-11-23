"use client"
import {Step} from "@/app/mokaraoke/create/page";
import {EditorProps} from "@/utils/components/EditorDefinitions";
import React, {useEffect, useState} from "react";
import {KaraokeLifetime} from "@/utils/types/KaraokeRequest";
import {uploadToYoutube} from "@/utils/clientHttp/UploadToYoutube";
import {getDownloadLinkForUuidResource} from "@/utils/clientHttp/getDownloadLinkForUuidResource";

export const UploadStep: Step = {
    label: "Upload",
    editor: ({ onSave, request }: EditorProps) => {
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [uploading, setUploading] = useState(false);
        const [uploaded, setUploaded] = useState(false);
        const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);

        const handleUpload = async () => {
            if (!title) return alert("Please enter a title before upoading.");
            setUploading(true);

            setTimeout(async () => {

                try {
                    const url = await uploadToYoutube(request.Inputs.Upload);
                    setYoutubeUrl(url);
                    const updates = {
                        Outputs: {youtubePath: url}
                    }
                    onSave(updates);
                    setUploaded(true);
                } catch (e){
                    alert(e);
                } finally {
                    setUploading(false);
                }



            }, 1)
        }

        return (
            <div className="flex flex-col space-y-4">
                <label className="font-medium">Video Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        onSave({
                            Inputs: {Upload: {title: e.target.value}},
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
                            Inputs: {Upload: {description: e.target.value}},
                        })
                    }
                    }
                    className="border p-2 rounded w-full"
                    rows={4}
                />


                {!uploaded ? (
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400`}
                    >
                        {uploading && (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        )}
                        <span>{uploading ? "Uploading..." : "Upload Video"}</span>
                    </button>
                ) : (
                    <div className="text-green-600 font-medium text-center margintop-4">
                        Video uploaded!{" "}
                        {youtubeUrl && (
                            <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                View on YouTube
                            </a>
                        )}
                    </div>
                )}

            </div>
        );
    },
    preview: ({ request }: { request: KaraokeLifetime }) => {
        if(!request.Inputs.Upload.generatedVideoUUID) return (
            <p>Error.</p>
        )
        const previewPath = getDownloadLinkForUuidResource(request.Inputs.Upload.generatedVideoUUID!);
        const title = request.Inputs.Upload.title;
        const description = request.Inputs.Upload.description;
        return (
            <div className="max-w-sm border rounded overflow-hidden shadow-lg">
                <video src={previewPath} controls className="w-full h-48 object-cover"/>

                {/* Video info */}
                <div className="p-4">
                    <h3 className="font-bold text-lg">{title || "Title goes here"}</h3>
                    <p className="text-gray-700 text-sm">
                        {description || "Description goes here"}
                    </p>
                </div>
            </div>
        )
    }
};
