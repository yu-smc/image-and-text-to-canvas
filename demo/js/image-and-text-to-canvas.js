class ImageTextToCanvas {
  sourceImageElement = null;
  wrapperElement = null
  outputImageElement = null

  constructor({wrapperElement, outputImageElement, generateOptions}) {
    this.wrapperElement = wrapperElement
    this.outputImageElement = outputImageElement
  }

  setup() {
    this.sourceImageElement = this.wrapperElement.querySelector('img')

    if (!this.sourceImageElement) {
      console.error('There must be 1 img element inside the wrapper element, but 0 was found')
      return
    }


  }
}

export { ImageTextToCanvas }