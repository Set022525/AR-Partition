export interface PartitionSize {
  width: number;
  height: number;
  depth: number;
}

export interface Partition {
  id: number;
  position: [number, number, number];
  size: PartitionSize;
}

export interface PartitionProps {
  partition: Partition;
  onPositionChange: (id: number, newPosition: [number, number, number]) => void;
  onSizeChange: (id: number, dimension: keyof PartitionSize, value: number) => void;
}
