import React from "react";

export type EditorProps = {
    onSubmit: () => void;
};

export type EditorComponent = React.ComponentType<EditorProps>;