import { IItem, ItemTypes } from "src/editor/interface";
import { Transformer } from "react-konva";

type TransformItemProps = {
    selectedElement: any;
    transformerRef: any;
}
const rightLeftStrach: ItemTypes[] = ["text", "line", "subjectTable", "ledgerTable"]
export const TransformItem = ({ selectedElement, transformerRef }: TransformItemProps) => {
    const handleTransform = () => {
        if (rightLeftStrach.includes(selectedElement.type)) {
            return ['middle-left', 'middle-right'];
        } else if (selectedElement.type === 'editor') {
            return [];
        }
        return undefined;
    };

    return (
        <Transformer
            ref={transformerRef}
            enabledAnchors={handleTransform()}
            boundBoxFunc={(oldBox, newBox) => {
                // Prevent shrinking below certain size for the selected element types
                if (selectedElement.type === 'text') {
                    newBox.width = Math.max(30, newBox.width);
                }
                return newBox;
            }}
        />
    );
};
