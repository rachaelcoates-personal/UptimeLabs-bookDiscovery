export function windowOverflowHidden() {
    const htmlDoc = document?.children[0] as HTMLElement;
  
    if (!htmlDoc) return
  
    htmlDoc.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
  
  export function windowOverflowDefault() {
    const htmlDoc = document?.children[0] as HTMLElement;
  
    if (!htmlDoc) return
  
    htmlDoc.style.overflow = "";
    document.body.style.overflow = "";
  }