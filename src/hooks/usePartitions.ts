'use client';

import { useState, useCallback } from 'react';
import { Partition, PartitionSize } from '../types/partition';

export const usePartitions = () => {
  const [partitions, setPartitions] = useState<Partition[]>([
    {
      id: 1,
      position: [0, 0, -1],
      size: { width: 1.5, height: 2.0, depth: 0.05 }
    }
  ]);

  const addPartition = useCallback(() => {
    const newId = Math.max(...partitions.map(p => p.id), 0) + 1;
    const newPartition: Partition = {
      id: newId,
      position: [Math.random() * 2 - 1, 0, -1 - Math.random()],
      size: { width: 1.0, height: 1.5, depth: 0.05 }
    };
    setPartitions(prev => [...prev, newPartition]);
  }, [partitions]);

  const removePartition = useCallback((id: number) => {
    setPartitions(prev => prev.filter(partition => partition.id !== id));
  }, []);

  const updatePartitionSize = useCallback((id: number, dimension: keyof PartitionSize, value: number) => {
    setPartitions(prev =>
      prev.map(partition =>
        partition.id === id
          ? {
              ...partition,
              size: { ...partition.size, [dimension]: Math.max(0.1, value) }
            }
          : partition
      )
    );
  }, []);

  const updatePartitionPosition = useCallback((id: number, newPosition: [number, number, number]) => {
    setPartitions(prev =>
      prev.map(partition =>
        partition.id === id
          ? { ...partition, position: newPosition }
          : partition
      )
    );
  }, []);

  return {
    partitions,
    addPartition,
    removePartition,
    updatePartitionSize,
    updatePartitionPosition
  };
};
