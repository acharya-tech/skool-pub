import { IItemImage } from 'src/editor/interface';
import { Image } from 'react-konva';
import useImage from 'use-image';

type ImageItemProps = {
  el: IItemImage;
  url?: string
}
const ImageItem = ({ el, url }: ImageItemProps) => {
  const [image] = useImage(el.url, 'anonymous');
  return <Image
    image={image}
    key={el.id}
    id={el.id}
    x={Number(el.x)}
    y={Number(el.y)}
    width={Number(el.width)}
    height={Number(el.height)}
    rotation={Number(el.rotation)}
    scaleX={Number(el.scaleX)}
    scaleY={Number(el.scaleY)}
    opacity={Number(el.opacity)}
  />;
};

export default ImageItem;
