"use client"
import {Step} from "@/app/mokaraoke/create/page";
import {EditorProps} from "@/components/EditorDefinitions";
import {useEffect, useState} from "react";
import {KaraokeLifetime, PartialKaraokeLifetime} from "@/types/KaraokeRequest";
import {createKaraokiVideo} from "@/clientHttp/CreateKaraokiVideo";

export const ProcessingStep: Step = {
    label: "Processing",
    editor: ({ onNext, onSave, request }: EditorProps) => {
        const [processing, setProcessing] = useState(false);
        const [candidateVideo, setCandidateVideo] = useState<string | null> (null);
        const [saved, setSaved] = useState(false);
        const [thisIsTheFirstAttempt, setThisIsTheFirstAttempt] = useState(true);

        const startProcessing = async () => {
            setProcessing(true);

            try {
                const result = await createKaraokiVideo(request);

                if(result) {
                    if(thisIsTheFirstAttempt){
                        keepResult(result)
                    } else {
                        setCandidateVideo(result)
                    }
                }
            } catch (e) {
                alert(e)
            } finally {
                setProcessing(false);
            }
        }

        const keepResult = (newVideoUrl : string) => {
            const updatedRequest : PartialKaraokeLifetime = {
                uploadRequest: {
                    generatedVideoPath: newVideoUrl
                }
            }

            setThisIsTheFirstAttempt(false);
            setCandidateVideo(null);
            setSaved(true);
            onSave(updatedRequest);
        }

        const useOld = () => {
            setCandidateVideo(null)
        }

        return (
            <div className={`p-4 space-y-4 ${processing ? "opacity-50 pointer-events-none" : ""}`}>
                {/* START BUTTON */}
                {!processing && (
                    <div className="relative group inline-block">
                        <button
                            onClick={startProcessing}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {thisIsTheFirstAttempt ? "Generate Video" : "Try Again"}
                        </button>

                        {/* Tooltip only appears if NOT first attempt */}
                        {!thisIsTheFirstAttempt && (
                            <div
                                className="absolute left-1/2 -translate-x-1/2 mt-2 w-56
                           bg-gray-800 text-white text-sm rounded p-2
                           opacity-0 group-hover:opacity-100
                           transition-opacity pointer-events-none z-10"
                            >
                                Trying again will generate a new video, but don’t worry —
                                your current result will not be deleted. You’ll be able to
                                choose between the old and new versions.
                            </div>
                        )}
                    </div>
                )}

                {/* PROCESSING SPINNER */}
                {processing && (
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin h-6 w-6 border-4 border-blue-300 border-t-transparent rounded-full"></div>
                        <span>Processing...</span>
                    </div>
                )}

                {/* RESULT PREVIEW */}
                {!thisIsTheFirstAttempt && candidateVideo &&  <VideoChoppingBlock
                    videoUrl={candidateVideo}
                    onAccept={() => keepResult(candidateVideo)}
                    onReject={useOld}
                />}

                {/* NEXT BUTTON */}
                <div>
                    <button
                        onClick={onNext}
                        disabled={!saved || processing}
                        className={`px-4 py-2 rounded ${
                            !saved || processing || candidateVideo
                                ? "bg-gray-400"
                                : "bg-purple-600 text-white"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    },
    preview: ({ request }: { request: KaraokeLifetime }) => {
        return request.uploadRequest.generatedVideoPath && <video src={request.uploadRequest.generatedVideoPath} controls className="w-full rounded"/>
    },
};


function VideoChoppingBlock({ videoUrl, onAccept, onReject }: { videoUrl: string, onAccept: () => void, onReject: () => void }) {
    {/* RESULT PREVIEW */}
    return <div className="space-y-2">
            <h3 className="font-semibold">Preview</h3>
            <video src={videoUrl} controls className="w-full rounded"/>

            <div className="flex space-x-2">
                <button
                    onClick={onAccept}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Use New Result
                </button>
                <button
                    onClick={onReject}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Use Old Result
                </button>
            </div>
        </div>
}