import React from "react";
import {KaraokeRequest} from "@/types/KaraokeRequest";

export type EditorProps = {
    request: KaraokeRequest;
    onNext: () => void;
    onSave: (k: Partial<KaraokeRequest>) => void;
};

export type EditorComponent = React.ComponentType<EditorProps>;
