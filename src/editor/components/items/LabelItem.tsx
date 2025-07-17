import React, { useRef } from "react";
import { Text } from "react-konva";
import Konva from "konva";
import { IItem, IItemLabel } from "src/editor/interface";

interface TextItemProps {
    el: IItemLabel;
    setSelected: (el: IItem | null) => void;
    handleRightClick: (e: any, el: IItem) => void;
    onElementUpdate: (id: string, item: Partial<IItem>) => void;
    onDoubleClick: (element: IItem) => void
}

export const LabelItem: React.FC<TextItemProps> = ({ el, onElementUpdate, handleRightClick, setSelected, onDoubleClick }) => {
    const textRef = useRef<Konva.Text | null>(null);
    const handleTransformEnd = () => {
        if (textRef.current) {
            const node = textRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // Get previous width before transformation
            const prevWidth = el.width;
            const newWidth = Math.max(50, prevWidth * scaleX);

            // Adjust x position only if scaling from the left
            // const deltaX = (prevWidth - newWidth) / 2; // Half to maintain center effect

            onElementUpdate(el.id, {
                ...el,
                rotation: parseFloat(node.rotation().toFixed(2)),
                // x: el.x + deltaX,
                width: parseFloat(newWidth.toFixed(2)), // Update width without distortion
            });

            // Reset scaling to prevent distortion
            node.scaleX(1);
            node.scaleY(1);
        }
    };
    let fontStyle = 'normal '
    if (el.bold) {
        fontStyle = 'bold '
    }
    if (el.italic) {
        fontStyle += 'italic'
    }
    return (
        <>
            <Text
                ref={textRef}
                id={el.id}
                x={el.x}
                y={el.y}
                fontStyle={fontStyle}
                width={el.width}
                rotation={el.rotation}
                draggable={!el.locked}
                fontSize={Number(el.fontSize)}
                align={el.textAlign}
                fill={el.color}
                visible={!el.hidden}
                scaleX={1}
                scaleY={1}
                text={el.text}
                opacity={Number(el.opacity)}
                wrap="word"
                onDragStart={() => {
                    setSelected(el);
                }}
                onTouchStart={(e) => {
                    console.log("touch start");
                }}
                onMouseOver={(e) => {
                    console.log("mouse over");
                }}
                zIndex={102}
                onClick={(e) => {
                    // e.stopPropagation();
                    console.log("item clicked");
                    setSelected(el);
                }}
                onGotPointerCapture={(e) => {
                    console.log("got pointer capture");
                }}
                onDragMove={(e) => {
                    onElementUpdate(el.id, {
                        ...el,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onDragEnd={(e) => {
                    onElementUpdate(el.id, {
                        ...el,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onContextMenu={(e) => {
                    e.evt.preventDefault();
                    handleRightClick(e, el);
                }}
                onDblClick={(e) => onDoubleClick(el)}
                onTransform={handleTransformEnd}
            />
        </>
    );
};