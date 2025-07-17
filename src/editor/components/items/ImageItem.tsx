import { IItem, IItemImage } from 'src/editor/interface';
import { rest } from 'lodash';
import { Image } from 'react-konva';
import useImage from 'use-image';

type ImageItemProps = {
  el: IItemImage;
  setSelected: (el: IItem | null) => void;
  handleRightClick: (e: any, el: IItem) => void;
  onElementUpdate: (id: string, item: Partial<IItem>) => void;
  onDoubleClick: (element: IItem) => void
}
const ImageItem = ({ el, onElementUpdate, setSelected, handleRightClick,onDoubleClick }: ImageItemProps) => {
  const [image] = useImage(el.url);
  return <Image
    image={image}
    id={el.id}
    x={el.x}
    y={el.y}
    width={el.width}
    height={el.height}
    rotation={el.rotation}
    draggable={!el.locked}
    // hitStrokeWidth={20}
    scaleX={el.scaleX}
    scaleY={el.scaleY}
    opacity={Number(el.opacity)}
    onDragStart={(e) => {
      setSelected(el);
    }}
    onClick={() => {
      console.log("image clicked")
      setSelected(el);
    }}
    onDragEnd={(e) => {
      onElementUpdate(el.id, {
        ...el,
        x: e.target.x(),
        y: e.target.y(),
        scaleX: e.target.scaleX(),
        scaleY: e.target.scaleY(),
        rotation: parseFloat(e.target.rotation().toFixed(2)),
        width: parseFloat(e.target.width().toFixed(2)),
        height: parseFloat(e.target.height().toFixed(2)),
      });
    }}
    onContextMenu={(e) => handleRightClick(e, el)}
    onDblClick={(e) => onDoubleClick(el)}
    onTransformEnd={(e) => {
      onElementUpdate(el.id, {
        ...el,
        x: e.target.x(),
        y: e.target.y(),
        scaleX: (e.target.scaleX()),
        scaleY: e.target.scaleY(),
        rotation: parseFloat(e.target.rotation().toFixed(2)),
        width: parseFloat(e.target.width().toFixed(2)),
        height: parseFloat(e.target.height().toFixed(2)),
      });
    }}
  />;
};

export default ImageItem;
