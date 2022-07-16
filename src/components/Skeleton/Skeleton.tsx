import './Skeleton.css';

export interface SkeletonProps {
  width: string;
  height: string;
  marginLeft?: string;
  marginBottom?: string;
}

export function Skeleton({ width, height, marginLeft, marginBottom }: SkeletonProps) {
  return <div className="skeleton" style={{ width, height, marginLeft, marginBottom }}></div>;
}
