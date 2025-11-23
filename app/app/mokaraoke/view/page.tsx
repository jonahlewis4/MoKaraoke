"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {Header} from "@/utils/components/LinkHeader";
import {getAllUploadedVideos} from "@/utils/supabase/db";
import {SanitizedVideo} from "@/app/api/karaoke/generated/all/route";

// ❗ Replace with a real API call later
// ❗ Replace with a real API call later
async function fetchSavedKaraoke(): Promise<SanitizedVideo[]> {
    return await getAllUploadedVideos();
}


export default function GalleryPage() {
    const [items, setItems] = useState<SanitizedVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSavedKaraoke();
                data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setItems(data);
            } catch (error) {
                console.error('Failed to fetch karaoke:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <Header title="Karaoki Gallery" subtitle="Create a new video" link="/mokaraoke/create"/>

            <div className="w-full max-w-6xl">
                <h2 className="text-2xl font-semibold mb-6">Your Past Karaoki Videos</h2>

                {loading ? (
                    <div className="text-gray-600">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-gray-600">No videos yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, idx) => (
                            <KaraokeCard key={idx} data={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function KaraokeCard({ data }: { data: SanitizedVideo }) {
    const embedUrl = convertYouTubeUrlToEmbed(data.youtubeUrl);

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            {/* YouTube embed */}
            <div className="relative w-full h-48 mb-4">
                <iframe
                    src={embedUrl}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg mb-2">{data.title}</h3>
        </div>
    );
}

// Convert normal YouTube URL → embed URL
function convertYouTubeUrlToEmbed(url: string): string {
    try {
        const id = new URL(url).searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : url;
    } catch {
        return url;
    }
}
