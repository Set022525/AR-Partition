'use client';

import React from 'react';
import { Partition, PartitionSize } from '../types/partition';

interface ControlPanelProps {
  partitions: Partition[];
  onAddPartition: () => void;
  onRemovePartition: (id: number) => void;
  onUpdateSize: (id: number, dimension: keyof PartitionSize, value: number) => void;
}

export default function ControlPanel({
  partitions,
  onAddPartition,
  onRemovePartition,
  onUpdateSize
}: ControlPanelProps) {
  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-sm">
      <h3 className="text-lg font-bold mb-4">パーティション制御</h3>

      <button
        onClick={onAddPartition}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-4 w-full"
      >
        パーティション追加
      </button>

      <div className="space-y-3">
        {partitions.map(partition => (
          <div key={partition.id} className="border border-gray-600 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">パーティション {partition.id}</h4>
              <button
                onClick={() => onRemovePartition(partition.id)}
                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
              >
                削除
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <label className="block">幅 (m)</label>
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={partition.size.width}
                  onChange={(e) => onUpdateSize(partition.id, 'width', parseFloat(e.target.value))}
                  className="w-full bg-gray-800 rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block">高さ (m)</label>
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={partition.size.height}
                  onChange={(e) => onUpdateSize(partition.id, 'height', parseFloat(e.target.value))}
                  className="w-full bg-gray-800 rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block">厚さ (m)</label>
                <input
                  type="number"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={partition.size.depth}
                  onChange={(e) => onUpdateSize(partition.id, 'depth', parseFloat(e.target.value))}
                  className="w-full bg-gray-800 rounded px-2 py-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
