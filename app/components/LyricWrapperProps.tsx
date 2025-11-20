import React, {ReactNode} from "react";
import TextHighLightAnimation from "@/components/TextHighLightAnimation";

export type LyricWrapperProps = {
    lyrics: string;
    children: ReactNode; // child content (video, image, etc.)
    className?: string;  // optional extra styling
};

export const LyricWrapper: React.FC<LyricWrapperProps> = ({
                                                    lyrics,
                                                    children,
                                                    className = "",
                                                }) => {
    return (
        <div
            className={`relative w-full h-48 bg-gray-300 flex items-end justify-start ${className}`}
        >
            {/* Main content */}
            {children}

            {/* Lyrics overlay at bottom */}
            <div className="absolute bottom-0 left-0 w-full">
                <TextHighLightAnimation lyrics={lyrics} />
            </div>
        </div>
    );
};