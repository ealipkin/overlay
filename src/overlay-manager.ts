import { Injectable, EventEmitter } from "@angular/core";

import {NguiOverlay} from "./overlay";

@Injectable()
export class NguiOverlayManager {
  //list of overlay objects
  static overlays: {[id: string]: NguiOverlay} = {};

  openEvent: EventEmitter<any> = new EventEmitter<any>();
  closeEvent: EventEmitter<any> = new EventEmitter<any>();

  register(overlay: NguiOverlay): void {
    NguiOverlayManager.overlays[overlay.id] = overlay;
    // console.log('overlay.register, OverlayManager.overlays', OverlayManager.overlays);
  }

  open(arg: string | NguiOverlay, event: Event): void {
    let overlay: NguiOverlay = typeof arg === 'string' ? NguiOverlayManager.overlays[arg] : arg;
    if (!overlay.opened) {
      overlay.positionIt(event);
      overlay.opened = true;
      this.openEvent.emit(arg);
    }
  }

  close(arg: string | NguiOverlay): void {
    let overlay: NguiOverlay = typeof arg === 'string' ? NguiOverlayManager.overlays[arg] : arg;
    overlay.element.style.display = 'none'
    overlay.opened = false;
    this.closeEvent.emit(arg);
  }
}