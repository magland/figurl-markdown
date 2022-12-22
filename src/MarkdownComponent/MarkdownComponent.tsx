import { isString, validateObject } from '@figurl/core-utils';
import { FunctionComponent } from 'react';
import Markdown from './Markdown/Markdown';

export type MarkdownData = {
    source: string
}
export const isMarkdownData = (x: any): x is MarkdownData => {
    return validateObject(x, {
        source: isString
    })
}

type Props = {
    data: MarkdownData
    width: number
    height: number
}

export const MarkdownComponent: FunctionComponent<Props> = ({data, width, height}) => {
    const {source} = data
    return (
        <div style={{margin: 30}}>
            <Markdown
                source={source}
            />
        </div>
    )
}