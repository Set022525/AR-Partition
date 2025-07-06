'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, ARButton } from '@react-three/xr';
import ARScene from '../components/ARScene';
import ControlPanel from '../components/ControlPanel';
import InstructionPanel from '../components/InstructionPanel';
import { usePartitions } from '../hooks/usePartitions';

export default function HomePage() {
  const {
    partitions,
    addPartition,
    removePartition,
    updatePartitionSize,
    updatePartitionPosition
  } = usePartitions();

  return (
    <div className="w-full h-screen bg-gray-900">
      {/* WebXR ARボタン */}
      <ARButton
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '12px 24px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      />

      {/* コントロールパネル */}
      <ControlPanel
        partitions={partitions}
        onAddPartition={addPartition}
        onRemovePartition={removePartition}
        onUpdateSize={updatePartitionSize}
      />

      {/* 使用方法パネル */}
      <InstructionPanel />

      {/* 3Dキャンバス */}
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 1.6, 3], fov: 75 }}
      >
        <XR>
          <ARScene
            partitions={partitions}
            onUpdatePartitionPosition={updatePartitionPosition}
          />
        </XR>
      </Canvas>
    </div>
  );
}
