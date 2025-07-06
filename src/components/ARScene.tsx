'use client';

import React from 'react';
import { Text } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { useXR } from '@react-three/xr';
import ARPartition from './ARPartition';
import { Partition } from '../types/partition';

interface ARSceneProps {
  partitions: Partition[];
  onUpdatePartitionPosition: (id: number, newPosition: [number, number, number]) => void;
}

export default function ARScene({ partitions, onUpdatePartitionPosition }: ARSceneProps) {
  const { isPresenting } = useXR();

  return (
    <>
      {/* 環境光 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* ARパーティション */}
      {partitions.map(partition => (
        <ARPartition
          key={partition.id}
          partition={partition}
          onPositionChange={onUpdatePartitionPosition}
        />
      ))}

      {/* 床面参照グリッド（AR時は非表示） */}
      {!isPresenting && (
        <gridHelper
          args={[10, 10, '#444444', '#444444']}
          position={[0, 0, 0]}
        />
      )}

      {/* 通常モード時のコントロール */}
      {!isPresenting && <OrbitControls />}

      {/* 操作説明テキスト */}
      <Text
        position={[0, 3, -2]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        ARパーティション配置システム
      </Text>

      <Text
        position={[0, 2.5, -2]}
        fontSize={0.1}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
      >
        パーティションをタップして選択・移動
      </Text>
    </>
  );
}
