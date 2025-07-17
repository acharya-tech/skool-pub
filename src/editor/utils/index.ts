import { IItem } from "../interface";

export const convertHTMLToSVG = (
  htmlContent: string,
  width: number,
  height: number
) => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" 
          style="white-space: pre-wrap;padding: 10px">
          <style>
            p {
              margin: 0; 
              padding: 0; 
              line-height: normal;
            }
          </style>
          ${htmlContent.replace(/<br>/g, "\n")}
        </div>
      </foreignObject>
    </svg>
  `;

  // Convert SVG string to Data URL
  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgString
  )}`;
  console.log(uri);
  return uri;
};

export const editorMergeItem = <T extends IItem>(item: T, updates: Partial<T>): T => {
  return { ...item, ...updates };
};
