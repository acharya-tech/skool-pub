import React from "react";
import { Text } from "react-konva";
import { IItemLabel } from "src/editor/interface";

interface TextItemProps {
    el: IItemLabel;
    text?: string
}

export const LabelItem: React.FC<TextItemProps> = ({ el, text }) => {
    let fontStyle = 'normal '
    if (el.bold) {
        fontStyle = 'bold '
    }
    if (el.italic) {
        fontStyle += 'italic'
    }
    return (
        <Text
            key={el.id}
            id={el.id}
            x={Number(el.x)}
            y={Number(el.y)}
            fontStyle={fontStyle}
            width={Number(el.width)}
            rotation={Number(el.rotation)}
            fontSize={Number(el.fontSize)}
            align={el.textAlign}
            fill={el.color}
            visible={!el.hidden}
            scaleX={1}
            scaleY={1}
            text={text ?? el.text}
            opacity={Number(el.opacity)}
            wrap="word"
        />
    );
};