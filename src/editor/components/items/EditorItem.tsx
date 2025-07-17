import { IItem, IItemEditor } from 'src/editor/interface';
import { Image } from 'react-konva';
import useImage from 'use-image';

type EditorItemProps = {
    el: IItemEditor;
    setSelected: (el: IItem | null) => void;
    handleRightClick: (e: any, el: IItem) => void;
    onElementUpdate: (id: string, item: Partial<IItem>) => void;
    onDoubleClick: (element: IItem) => void
}
const EditorItem = ({ el, onElementUpdate, setSelected, handleRightClick, onDoubleClick }: EditorItemProps) => {
    const [image] = useImage(el.uri);
    return <Image
        image={image}
        id={el.id}
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rotation={el.rotation}
        draggable={!el.locked}
        hitStrokeWidth={20}
        scaleX={el.scaleX}
        scaleY={el.scaleY}
        opacity={Number(el.opacity)}
        onDragStart={(e) => {
            setSelected(el);
        }}
        onClick={() => {
            setSelected(el);
        }}
        onDragEnd={(e) => {
            const node = e.currentTarget
            onElementUpdate(el.id, {
                ...el,
                x: Number(node.x()),
                y: Number(node.y()),
                scaleX: Number(node.scaleX()),
                scaleY: Number(node.scaleY()),
                rotation: parseFloat(Number(node.rotation()).toFixed(2)),
                width: parseFloat(Number(node.width()).toFixed(2)),
                height: parseFloat(Number(node.height()).toFixed(2)),
            });
        }}
        onContextMenu={(e) => handleRightClick(e, el)}
        onDblClick={(e) => onDoubleClick(el)}
        onTransformEnd={(e) => {
            const node = e.currentTarget
            onElementUpdate(el.id, {
                ...el,
                x: Number(node.x()),
                y: Number(node.y()),
                scaleX: Number(node.scaleX()),
                scaleY: Number(node.scaleY()),
                rotation: parseFloat(Number(node.rotation()).toFixed(2)),
                width: parseFloat(Number(node.width()).toFixed(2)),
                height: parseFloat(Number(node.height()).toFixed(2)),
            });
        }}
    />;
};

export default EditorItem;
