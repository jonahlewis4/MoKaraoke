"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type SavedKaraoke = {
    youtubeUrl: string;
    title: string;
};

// ❗ Replace with a real API call later
// ❗ Replace with a real API call later
async function fetchSavedKaraoke(): Promise<SavedKaraoke[]> {
    return [
        {
            youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "My First Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
            title: "Smooth Jazz Night"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=3JWTaaS7LdU",
            title: "Classic Ballad"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
            title: "Bohemian Rhapsody Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=hTWKbfoikeg",
            title: "Rock Anthem Singalong"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
            title: "Soft Piano Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
            title: "Emo Night Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
            title: "Adele Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=ktvTqknDobU",
            title: "Imagine Dragons Vocal Track"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=iEPTlhBmwRg",
            title: "Pop Classic Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=uelHwf8o7_U",
            title: "Energetic Pop Remix"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=60ItHLz5WEA",
            title: "Clean EDM Instrumental"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=19h5mH4p8So",
            title: "Chill Acoustic Backing Track"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
            title: "Gangnam Style Karaoke"
        },
        {
            youtubeUrl: "https://www.youtube.com/watch?v=CevxZvSJLk8",
            title: "Pop Diva Anthem"
        }
    ];
}


export default function GalleryPage() {
    const [items, setItems] = useState<SavedKaraoke[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedKaraoke().then(data => {
            setItems(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <Header />

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

function KaraokeCard({ data }: { data: SavedKaraoke }) {
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

function Header() {
    return (
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Karaoki Gallery</h1>
            <Link href="/create" className="text-blue-500 text-sm hover:underline">
                Create New Video
            </Link>
        </div>
    );
}
