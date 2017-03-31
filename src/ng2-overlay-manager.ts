import {Injectable, EventEmitter} from "@angular/core";

import {Ng2Overlay} from "./ng2-overlay";

@Injectable()
export class Ng2OverlayManager {
  //list of overlay objects
  static overlays: {[id: string]: Ng2Overlay} = {};

  openEvent: EventEmitter<any> = new EventEmitter<any>();
  closeEvent: EventEmitter<any> = new EventEmitter<any>();

  register(overlay: Ng2Overlay): void {
    Ng2OverlayManager.overlays[overlay.id] = overlay;
    // console.log('overlay.register, OverlayManager.overlays', OverlayManager.overlays);
  }

  open(arg: string | Ng2Overlay, event: Event): void {
    let overlay: Ng2Overlay = typeof arg === 'string' ? Ng2OverlayManager.overlays[arg] : arg;
    if (!overlay.opened) {
      overlay.positionIt(event);
      overlay.opened = true;

      this.openEvent.emit(arg);
    }
  }

  close(arg: string | Ng2Overlay): void {
    let overlay: Ng2Overlay = typeof arg === 'string' ? Ng2OverlayManager.overlays[arg] : arg;
    overlay.element.style.display = 'none';
    overlay.opened = false;
    this.closeEvent.emit(arg);
  }
}
