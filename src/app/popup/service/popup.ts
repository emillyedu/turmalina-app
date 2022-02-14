import { Injectable, Type, Injector } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { PopupInstance } from '../popup-instance';
import { IPopupOptions } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {
  }

  public open<TComponent, TValue>(component: Type<TComponent>, options: IPopupOptions<TComponent> = {}): PopupInstance<TValue> {
    const overlayRef = this.createOverlay();

    const popupInstance = this.createPopup<TComponent, TValue>(overlayRef, component, options);

    return popupInstance;
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }

  public createPopup<TComponent, TValue>(
    overlayRef: OverlayRef,
    component: Type<TComponent>,
    options: IPopupOptions<TComponent>
  ): PopupInstance<TValue> {
    const popupInstance = new PopupInstance<TValue>(overlayRef);

    const injector = new PortalInjector(this.injector, new WeakMap([
      [ PopupInstance, popupInstance ]
    ]));

    const componentRef = overlayRef.attach(
      new ComponentPortal(component, undefined, injector)
    );

    Object.keys(options.inputs).forEach(key => {
      componentRef.instance[key] = options.inputs[key];
    });

    return popupInstance;
  }
}