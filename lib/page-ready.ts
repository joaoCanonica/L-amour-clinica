// Coordena animações de entrada com a transição de página: enquanto a cortina
// cobre a tela, as animações "on mount" da nova página esperam; elas começam
// no instante em que a cortina começa a subir.
let transitioning = false;
const listeners = new Set<() => void>();

export function setTransitioning(value: boolean) {
  transitioning = value;
  if (!value) {
    const pending = Array.from(listeners);
    listeners.clear();
    pending.forEach((fn) => fn());
  }
}

export function whenPageReady(fn: () => void): () => void {
  if (!transitioning) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
