type SpaceProps = { paddingX: number; height?: never } | { height: number; paddingX?: never };

export function Space({ paddingX, height }: SpaceProps) {
  if (paddingX !== undefined) {
    return <div style={{ paddingTop: `${paddingX}px`, paddingBottom: `${paddingX}px` }} />;
  }

  return <div style={{ height: `${height}px` }} />;
}
