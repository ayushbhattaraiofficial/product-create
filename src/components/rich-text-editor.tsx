import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's Snow theme

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const [editorValue, setEditorValue] = useState<string>(value);

    useEffect(() => {
        if (value !== editorValue) {
            setEditorValue(value);
        }
    }, [value]);

    const handleEditorChange = (content: string) => {
        setEditorValue(content);
        onChange(content); // Send the rich text content to the parent component
    };

    return (
        <div className="w-full min-h-[20px] border rounded-lg overflow-hidden">
            <ReactQuill
                value={editorValue}
                onChange={handleEditorChange}
                theme="snow" // Use Quill's default Snow theme
                modules={{
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        [{ 'align': [] }],
                        ['blockquote'],
                        [{ 'insertTable': [] }],
                        ['undo', 'redo'],
                    ],
                }}
            />
        </div>
    );
};

export default RichTextEditor;
