import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class PopupInstance<TValue> {
  private closed = new Subject<TValue | undefined>();
  private shouldClose = new Subject<void>();
  private value: TValue | undefined;

  constructor(
    private overlayRef: OverlayRef,
  ) {
    this.overlayRef.detachments()
      .subscribe(() => {
        this.closed.next(this.value);
        this.closed.complete();

        this.overlayRef.dispose();
      });
  }

  public close(): void {
    this.shouldClose.next();
    this.shouldClose.complete();
  }

  public detach(): void {
    this.overlayRef.detach();
  }

  public setCloseValue(value: TValue): void {
    this.value = value;
  }

  public onShouldClose(): Observable<void> {
    return this.shouldClose.asObservable();
  }

  public onClose(): Observable<TValue | undefined> {
    return this.closed.asObservable();
  }
}