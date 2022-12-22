import 'github-markdown-css'
import React, { FunctionComponent } from 'react'
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula as highlighterStyle} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMathPlugin from 'remark-math'
import rehypeKatexPlugin from 'rehype-katex'
import "katex/dist/katex.min.css"
import rehypeRaw from "rehype-raw";

export interface MarkdownProps {
    source: string
}

const Markdown: FunctionComponent<MarkdownProps> = ({ source }) => {
    return (
        <div className='markdown-body'>
            <ReactMarkdown
                children={source}
                remarkPlugins={[remarkGfm, remarkMathPlugin]}
                rehypePlugins={[rehypeRaw, rehypeKatexPlugin]}
                components={{
                    code: ({node, inline, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={highlighterStyle as any}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                }}
                linkTarget="_blank"
            />
        </div>
    );
}

export default Markdown