import Konva from "konva";

export const handleStagePrint = async (stageList: Konva.Stage[]) => {
  const imageUrls = stageList.map((stage: Konva.Stage) => {
    const scaleX = 2; // Increase by 2x or more for better resolution
    const scaleY = 2; // Same scaling for height and width

    // Save the original scale and size
    const originalWidth = stage.width();
    const originalHeight = stage.height();
    const originalScaleX = stage.scaleX();
    const originalScaleY = stage.scaleY();

    // Set the scale for better quality
    stage.scale({ x: scaleX, y: scaleY });
    stage.width(originalWidth * scaleX); // Increase width for higher resolution
    stage.height(originalHeight * scaleY); // Increase height for higher resolution

    // Generate the high-resolution base64 image
    const imageDataUrl = stage.toDataURL();

    // Restore the original scale and size
    stage.scale({ x: originalScaleX, y: originalScaleY });
    stage.width(originalWidth); // Restore original width
    stage.height(originalHeight); // Restore original height

    return imageDataUrl;
  });

  // Create a hidden iframe element to hold the images
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-9999px"; // Hide the iframe off-screen
  iframe.style.width = "0";
  iframe.style.height = "0";

  // Append iframe to the body
  document.body.appendChild(iframe);

  // Get the iframe's document and inject the images content
  const iframeDocument = iframe.contentWindow!.document;
  iframeDocument.open();
  iframeDocument.write(`
      <html>
        <head>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              img {
                width: 100%;
                page-break-after: always; /* Ensure each bill starts on a new page */
              }
            }
          </style>
        </head>
        <body>
          ${imageUrls.map((img: string) => `<img src="${img}" />`).join("")}
        </body>
      </html>
    `);
  iframeDocument.close();

  // Trigger the print dialog
  setTimeout(() => {
    iframe.contentWindow!.focus();
    iframe.contentWindow!.print();

    // Clean up the iframe after printing
    document.body.removeChild(iframe);
  }, stageList.length * 100);
};
