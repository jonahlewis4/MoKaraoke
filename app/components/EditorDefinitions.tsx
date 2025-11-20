import React from "react";
import {KaraokeRequest} from "../../types/KaraokeRequest";

export type EditorProps = {
    onSubmit: (k: KaraokeRequest) => void;
};

export type EditorComponent = React.ComponentType<EditorProps>;
