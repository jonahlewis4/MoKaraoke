import React from "react";
import {KaraokeLifetime, PartialKaraokeLifetime} from "@/types/KaraokeRequest";

export type EditorProps = {
    request: KaraokeLifetime;
    onNext: () => void;
    onSave: (k: PartialKaraokeLifetime) => void;
};

export type EditorComponent = React.ComponentType<EditorProps>;
