import React, { useRef, useState } from "react";
import { Line } from "react-konva";
import Konva from "konva";
import { IItem, IItemLine } from "src/editor/interface";

interface LineItemProps {
    el: IItemLine;
    setSelected: (el: IItem | null) => void;
    handleRightClick: (e: any, el: IItem) => void;
    onElementUpdate: (id: string, item: Partial<IItem>) => void;
    onDoubleClick: (element: IItem) => void;
}

export const LineItem: React.FC<LineItemProps> = ({
    el,
    onElementUpdate,
    handleRightClick,
    setSelected,
    onDoubleClick,
}) => {
    const lineRef = useRef<Konva.Line | null>(null);
    const [points, setPoints] = useState([50, 10, 50 + el.width, 10])
    const handleTransformEnd = () => {
        if (lineRef.current) {
            const node = lineRef.current;

            // Get the current scale
            const scaleX = node.scaleX();

            // Calculate the new width based on the scale
            const newEndX = (el.width * scaleX) + 50;

            // Update points
            const updatedPoints = [50, 100, newEndX, 100];
            setPoints(updatedPoints);

            // Reset scale to avoid compounding transformations
            node.scaleX(1);

            // Update the element with the new width
            onElementUpdate(el.id, {
                ...el,
                width: newEndX - 50,
                rotation: parseFloat(node.rotation().toFixed(2)),
            });
        }
    };


    return (
        <Line
            ref={lineRef}
            points={points} // Use dynamic points for resizing
            id={el.id}
            x={el.x}
            y={el.y}
            lineCap="round"
            lineJoin="round"
            rotation={el.rotation}
            draggable
            // draggable={!el.locked}
            strokeWidth={el.height}
            stroke={el.color}
            visible={!el.hidden}
            // hitStrokeWidth={20}
            opacity={el.opacity}
            onDragStart={() => {
                setSelected(el);

            }}
            onDragMove={(e) => {

            }}
            onClick={() => {
                setSelected(el);
            }}
            onDragEnd={(e) => {
                onElementUpdate(el.id, {
                    ...el,
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            onContextMenu={(e) => handleRightClick(e, el)}
            onDblClick={() => onDoubleClick(el)}
            onTransformEnd={handleTransformEnd} // Update line width after transform
        />
    );
};
