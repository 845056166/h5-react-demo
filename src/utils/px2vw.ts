export function px2vw(px: number): string {
  return `${(px / ROOT_VALUE) * 100}vw`
}

export function px2design(px: number): number {
  return (px * ROOT_VALUE) / document.documentElement.clientWidth
}
