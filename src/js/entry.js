export class ImageTextToCanvas {
  sourceImageElement = null;
  wrapperElement = null
  outputImageElement = null
  textContainerElement = null
  textElement = null

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

    this.textContainerElement = document.createElement('div')
    this.textContainerElement.id = "itc-text-container"
    
    this.textElement = document.createElement('div')
    this.textElement.id = "itc-text"
    this.textElement.contentEditable = true

    this.textContainerElement.appendChild(this.textElement)

    

    


  }
}