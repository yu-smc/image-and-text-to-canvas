import html2canvas from "./lib/html2canvas.esm.js";

export class ImageTextToCanvas {
  sourceImageElement = null;
  sourceImageAspectRatio = null;
  wrapperElement = null;
  textContainerElement = null;
  textElement = null;

  constructor({ wrapperElement }) {
    this.wrapperElement = wrapperElement;

    this.init();
  }

  init() {
    //initialize necessary styles and calculations
    if (getComputedStyle(this.wrapperElement).position === "static") {
      this.wrapperElement.style.position = "relative";
    }
  }

  setup({
    textColor,
    textWidth,
    textHeight,
    hideOverflowText,
    horizontalTextAlignment,
    verticalTextAlignment,
  }) {
    this.sourceImageElement = this.wrapperElement.querySelector("img");
    this.sourceImageAspectRatio =
      this.sourceImageElement.naturalHeight /
      this.sourceImageElement.naturalWidth;

    if (!this.sourceImageElement) {
      console.error(
        "There must be 1 img element inside the wrapper element, but 0 was found"
      );
      return;
    }

    //create dom elements for text input
    this.textContainerElement = document.createElement("div");
    this.textContainerElement.id = "itc-text-container";

    this.textElement = document.createElement("div");
    this.textElement.id = "itc-text";
    this.textElement.contentEditable = true;

    //set text elements style
    this.textContainerElement.style.position = "absolute";
    this.textContainerElement.style.top = "0";
    this.textContainerElement.style.right = "0";
    this.textContainerElement.style.bottom = "0";
    this.textContainerElement.style.left = "0";
    this.textContainerElement.style.margin = "auto";
    this.textContainerElement.style.width = textWidth;
    this.textContainerElement.style.height = textHeight;

    if (hideOverflowText) {
      this.textContainerElement.style.overflow = "hidden";
    }

    this.textElement.style.width = "100%";
    this.textElement.style.height = "100%";
    this.textElement.style.color = textColor;

    if (horizontalTextAlignment === "center") {
      this.textElement.style.textAlign = "center";
    }

    // if (verticalTextAlignment === "center") {
    //   this.textElement.style.display = 'flex'
    //   this.textElement.style.alignItems = 'center'
    // }

    this.textContainerElement.appendChild(this.textElement);
    this.wrapperElement.appendChild(this.textContainerElement);
  }

  async generate({ outputImageWidthPx, quality }) {
    return new Promise(async (resolve, reject) => {
      if (typeof outputImageWidthPx !== "number") {
        console.alert('"outputImageWidthPx must be number"');
        reject();
      }

      const outputCanvas = await html2canvas(this.wrapperElement, {
        backgroundColor: null,
        scale: 3,
        // allowTaint: true,
      });

      resolve(outputCanvas.toDataURL("image/jpeg", quality || 0.9));

      // const canvasWidth = outputImageWidthPx;
      // const canvasHeight = canvasWidth * this.sourceImageAspectRatio;

      // canvas.width = canvasWidth;
      // canvas.height = canvasHeight;
    });
  }
}
