export interface IPopupOptions<TComponent> {
  inputs?: {
    [ P in keyof TComponent ]?: TComponent[P];
  };
}