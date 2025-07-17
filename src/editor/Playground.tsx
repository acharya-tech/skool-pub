import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import URLImage from './components/items/ImageItem';
import { IItem, IMenuContext, ITempConstrants, ITemplateData, PAPER_SIZES, PaperOrientationEnum, PrintablePaperEnum, TEMPLATE_MAX_ZOOM, TEMPLATE_MIN_ZOOM } from './interface';
import Konva from 'konva';
import { HeaderMenu } from './components/HeaderMenu';
import { LabelItem } from './components/items/LabelItem';
import EditorItem from './components/items/EditorItem';
import { EditModal } from './components/EditModal';
import { TransformItem } from './components/items/Transformer';
import { NebXIIGradesheet } from './components/items/NebXIIGradesheet';
import { GradeLedger } from './components/items/Gradeledger';
import { FinalTermSheet } from './components/items/FinalTermSheet';

type PlaygroundProps = {
  paperSize?: PrintablePaperEnum;
  elements: IItem[];
  onSave: (value: any) => void;
  title: string,
  tempValue: Omit<ITemplateData, "items">;
  onElementUpdate: (id: string, updates: Partial<IItem>) => void;
  setMenu: React.Dispatch<React.SetStateAction<IMenuContext>>
  menuState: IMenuContext
  constrants: ITempConstrants
  onClose: () => void
}
const Playground = ({ tempValue, constrants, onSave, onClose, title, setMenu, menuState, elements, onElementUpdate, }: PlaygroundProps) => {
  const selectedElement = menuState.element
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<any>(null);
  const [scale, setScale] = useState(0.5);
  const [stagePos, setStagePos] = useState({ x: 70, y: 70 });
  const [draggingStage, setDraggingStage] = useState(false);
  const [paperOrientation, setPaperOrintation] = useState(tempValue.paperOrientation ?? PaperOrientationEnum.PORTRAIT);
  const [paperSize, setPaperSize] = useState<PrintablePaperEnum>(tempValue.paperSize ?? PrintablePaperEnum.A4);
  const paperWidth = paperOrientation === PaperOrientationEnum.LANDSCAPE ? PAPER_SIZES[paperSize].height : PAPER_SIZES[paperSize].width;
  const paperHeight = paperOrientation === PaperOrientationEnum.LANDSCAPE ? PAPER_SIZES[paperSize].width : PAPER_SIZES[paperSize].height;

  useEffect(() => {
    if (transformerRef.current && selectedElement) {
      const stage = stageRef.current;
      const selectedNode = stage?.findOne(`#${selectedElement?.id}`) as unknown as Konva.Node | undefined;
      if (!selectedNode) return;
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedElement]);

  const renderGrid = (spacing = 20) => {
    const lines = [];

    // Vertical lines
    for (let x = 0; x < paperWidth; x += spacing) {
      lines.push(<Line listening={false} key={`v-${x}`} points={[x, 0, x, paperHeight]} stroke="#ddd" strokeWidth={0.5} />);
    }

    // Horizontal lines
    for (let y = 0; y < paperHeight; y += spacing) {
      lines.push(<Line listening={false} key={`h-${y}`} points={[0, y, paperWidth, y]} stroke="#ddd" strokeWidth={0.5} />);
    }

    return lines;
  };

  const handleSave = () => {
    const items = {
      paperSize: paperSize,
      paperWidth,
      paperHeight,
      paperOrientation,
      items: elements
    }
    onSave(items)
  }
  const handleRotatePaper = () => {
    setPaperOrintation(paperOrientation === PaperOrientationEnum.PORTRAIT ? PaperOrientationEnum.LANDSCAPE : PaperOrientationEnum.PORTRAIT);
  }

  const handleZoom = (zoom: boolean) => {
    if (!stageRef.current) return;
    const scaleBy = 1.05;
    const oldScale = scale;
    const stage = stageRef.current;
    const pointer = stage.getPointerPosition();
    if (!pointer) return; // Ensure pointer is not null
    const newScale = zoom ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale < TEMPLATE_MIN_ZOOM || newScale > TEMPLATE_MAX_ZOOM) return;
    setScale(newScale);

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    setStagePos({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  }
  // Handle zoom in/out
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    handleZoom(e.evt.deltaY <= 0);
  };

  const setSelected = (el: IItem | null, pos?: { x: number, y: number }) =>
    setMenu((e: IMenuContext) => ({ ...e, element: el, open: Boolean(pos), position: pos }))

  const handleRightClick = (e: any, element: IItem) => {
    e.evt.preventDefault();
    setSelected(element, { x: e.evt.clientX, y: e.evt.clientY })
  };
  const onDoubleClick = (element: IItem) => {
    setMenu(menu => ({ ...menu, element, action: "edit" }))
  };
  // Handle stage dragging
  const handleStageMouseDown = (e: any) => {
    if (e.target === stageRef.current) {
      setDraggingStage(true);
    }
  };

  const handleStageMouseMove = () => {
    if (draggingStage) {
      const stage = stageRef.current;
      setStagePos({
        x: stage?.x() ?? 0,
        y: stage?.y() ?? 0,
      });
    }
  };

  const handleStageMouseUp = () => {
    setDraggingStage(false);
  };
  return (
    <>
      <div>
        <HeaderMenu
          title={title}
          onRotate={handleRotatePaper}
          onSave={handleSave}
          paperSize={paperSize}
          setPaperSize={setPaperSize}
          setZoom={handleZoom}
          zoom={scale}
          onClose={onClose}
          constrants={constrants}
        />
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          scaleX={scale}
          scaleY={scale}
          x={stagePos.x}
          y={stagePos.y}
          draggable
          onDragEnd={handleStageMouseUp}
          onWheel={handleWheel}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
          // onClick={(e) => setSelected(null)}
          style={{ background: '#f0f0f0', border: '1px solid #ccc' }}
        >
          <Layer>
            {/* Paper Boundary */}
            <Rect
              x={0}
              y={0}
              width={paperWidth}
              height={paperHeight}
              fill="#fff"
              stroke="#000"
              strokeWidth={1}
              listening={false}
            />
            {renderGrid(20)}
            {/* Render each element */}
            {elements.slice().reverse().map((el) => {
              if (el.type === 'text') {
                return (
                  <LabelItem key={el.id} el={el} onElementUpdate={onElementUpdate} handleRightClick={handleRightClick} setSelected={setSelected} onDoubleClick={onDoubleClick} />
                );
              }
              if (el.type === 'image') {
                return (
                  <URLImage key={el.id} el={el} onElementUpdate={onElementUpdate} handleRightClick={handleRightClick} setSelected={setSelected} onDoubleClick={onDoubleClick} />
                );
              }
              if (el.type === 'editor') {
                return (
                  <EditorItem key={el.id} el={el} onElementUpdate={onElementUpdate} handleRightClick={handleRightClick} setSelected={setSelected} onDoubleClick={onDoubleClick} />
                );
              }
              if (el.type === 'subjectTable') {
                if (el.tableId == "term_gradesheet") {
                  return (
                    <FinalTermSheet key={el.id} el={el} onElementUpdate={onElementUpdate} handleRightClick={handleRightClick} setSelected={setSelected} onDoubleClick={onDoubleClick} />
                  );
                }
                return (
                  <NebXIIGradesheet key={el.id} el={el} onElementUpdate={onElementUpdate} handleRightClick={handleRightClick} setSelected={setSelected} onDoubleClick={onDoubleClick} />
                );
              }
              if (el.type === 'ledgerTable') {
                return (
                  <GradeLedger key={el.id} el={el} onElementUpdate={onElementUpdate} handleRightClick={handleRightClick} setSelected={setSelected} onDoubleClick={onDoubleClick} />
                );
              }
            })}

            {/* Transformer for Resizing */}
            {selectedElement && (
              <TransformItem selectedElement={selectedElement} transformerRef={transformerRef} />
            )}
          </Layer>
        </Stage>
        {menuState.action === 'edit' &&
          <EditModal
            open={true}
            paperHeight={paperHeight}
            paperWidth={paperWidth}
            selectedElement={menuState.element}
            onClose={() => setMenu({ ...menuState, action: null })}
            onConfirm={onElementUpdate}
          />
        }

      </div>
    </>
  );
};

export default Playground;
