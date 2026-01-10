import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
    return (
        <div className="my-4 overflow-hidden rounded-lg border border-white/10">
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    fontSize: "0.875rem",
                }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

