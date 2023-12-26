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
    placeholderText,
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

    //set text element
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

    //set placeholder
    this.placeholderTextElement = document.createElement("p");
    this.placeholderTextElement.id = "itc-placeholder";
    this.placeholderTextElement.style.color = textColor;
    this.placeholderTextElement.innerHTML = placeholderText;
    this.placeholderTextElement.style.textAlign = "center";
    this.placeholderTextElement.style.position = "absolute";
    this.placeholderTextElement.style.top = "0";
    this.placeholderTextElement.style.right = "0";
    this.placeholderTextElement.style.bottom = "0";
    this.placeholderTextElement.style.left = "0";
    this.placeholderTextElement.style.margin = "auto";
    this.placeholderTextElement.setAttribute("data-html2canvas-ignore", "");
    this.placeholderTextElement.style.pointerEvents = "none";

    //set placeholder display logic
    this.textElement.addEventListener("focus", () => {
      this.placeholderTextElement.style.display = "none";
    });
    this.textElement.addEventListener("blur", () => {
      if (this.textElement.innerHTML.length === 0) {
        this.placeholderTextElement.style.display = "block";
      }
    });

    if (horizontalTextAlignment === "center") {
      this.textElement.style.textAlign = "center";
    }

    // if (verticalTextAlignment === "center") {
    //   this.textElement.style.display = 'flex'
    //   this.textElement.style.alignItems = 'center'
    // }

    this.textContainerElement.appendChild(this.textElement);
    this.textContainerElement.appendChild(this.placeholderTextElement);
    this.wrapperElement.appendChild(this.textContainerElement);
  }

  async generate({ outputImageWidthPx = 1000, quality = 0.9 }) {
    return new Promise(async (resolve, reject) => {
      if (typeof outputImageWidthPx !== "number") {
        console.alert('"outputImageWidthPx must be number"');
        reject();
      }

      const outputCanvas = await html2canvas(this.wrapperElement, {
        backgroundColor: null,
        scale: 3,
      });

      const resizedCanvas = document.createElement("canvas");
      const resizedContext = resizedCanvas.getContext("2d");

      resizedCanvas.width = outputImageWidthPx;
      resizedCanvas.height = outputImageWidthPx * this.sourceImageAspectRatio;

      resizedContext.drawImage(
        outputCanvas,
        0,
        0,
        resizedCanvas.width,
        resizedCanvas.height
      );

      resolve(resizedCanvas.toDataURL("image/jpeg", quality));
    });
  }
}
