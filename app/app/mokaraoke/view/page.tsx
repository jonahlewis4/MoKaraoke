"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KaraokeLifetime, KaraokeInputs, downloadKInputs } from "@/utils/types/KaraokeRequest";

// ❗ Replace this with a real API call
async function fetchKaraokeHistory(): Promise<KaraokeLifetime[]> {
    return [
        {
            Inputs: {
                Generate: {
                    audioPath: "/demo/audio1.mp3",
                    backgroundPath: "/demo/bg1.jpg"
                },
                Upload: {
                    title: "My First Karaoke",
                    description: "A sample description",
                    generatedVideoPath: "/demo/video1.png"
                }
            },
            Outputs: {
                youtubePath: "https://youtube.com/watch?v=abc123"
            }
        }
    ];
}

export default function GalleryPage() {
    const [items, setItems] = useState<KaraokeLifetime[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchKaraokeHistory().then(data => {
            setItems(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <Header />

            <div className="w-full max-w-6xl">
                <h2 className="text-2xl font-semibold mb-6">Your Past Karaoke Videos</h2>

                {loading ? (
                    <div className="text-gray-600">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-gray-600">No past videos yet.</div>
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

function KaraokeCard({ data }: { data: KaraokeLifetime }) {
    const img = data.Inputs.Upload.generatedVideoPath || "/placeholder.jpg";

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            {/* Thumbnail */}
            <div className="relative w-full h-40 mb-4">
                <Image
                    src={img}
                    alt={data.Inputs.Upload.title}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            {/* Content */}
            <h3 className="font-bold text-lg">{data.Inputs.Upload.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{data.Inputs.Upload.description}</p>

            {/* Buttons */}
            <div className="mt-auto flex flex-col gap-2">
                <button
                    onClick={() => downloadKInputs(data.Inputs)}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                    Download Inputs
                </button>

                {data.Outputs.youtubePath && (
                    <Link
                        href={data.Outputs.youtubePath}
                        target="_blank"
                        className="px-3 py-2 bg-red-600 text-white text-center rounded hover:bg-red-700 text-sm"
                    >
                        View on YouTube
                    </Link>
                )}
            </div>
        </div>
    );
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
