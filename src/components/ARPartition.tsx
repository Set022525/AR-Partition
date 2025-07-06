'use client';

import React, { useState, useRef } from 'react';
import { Interactive } from '@react-three/xr';
import { Text, Box } from '@react-three/drei';
import * as THREE from 'three';
import { Partition } from '../types/partition';

interface ARPartitionProps {
  partition: Partition;
  onPositionChange: (id: number, newPosition: [number, number, number]) => void;
}

export default function ARPartition({ partition, onPositionChange }: ARPartitionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(new THREE.Vector3());

  const handleSelect = (event: any) => {
    event.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handlePointerDown = (event: THREE.Event & { point: THREE.Vector3 }) => {
    if (isSelected && meshRef.current) {
      setIsDragging(true);
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      setDragOffset(worldPosition.clone().sub(event.point));
    }
  };

  const handlePointerMove = (event: THREE.Event & { point: THREE.Vector3 }) => {
    if (isDragging && isSelected) {
      const newPosition = event.point.clone().add(dragOffset);
      onPositionChange(partition.id, newPosition.toArray() as [number, number, number]);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <Interactive onSelect={handleSelect}>
      <group position={partition.position}>
        {/* メインパーティション */}
        <Box
          ref={meshRef}
          args={[partition.size.width, partition.size.height, partition.size.depth]}
          position={[0, partition.size.height / 2, 0]}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <meshStandardMaterial
            color={isSelected ? "#4f46e5" : "#6b7280"}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </Box>

        {/* 選択時のアウトライン */}
        {isSelected && (
          <Box
            args={[
              partition.size.width + 0.02,
              partition.size.height + 0.02,
              partition.size.depth + 0.02
            ]}
            position={[0, partition.size.height / 2, 0]}
          >
            <meshBasicMaterial
              color="#60a5fa"
              wireframe
              transparent
              opacity={0.8}
            />
          </Box>
        )}

        {/* サイズ調整ハンドル */}
        {isSelected && (
          <group>
            {/* 幅調整ハンドル */}
            <Box
              args={[0.05, 0.05, 0.05]}
              position={[partition.size.width / 2, partition.size.height / 2, 0]}
            >
              <meshStandardMaterial color="#ef4444" />
            </Box>
            <Box
              args={[0.05, 0.05, 0.05]}
              position={[-partition.size.width / 2, partition.size.height / 2, 0]}
            >
              <meshStandardMaterial color="#ef4444" />
            </Box>

            {/* 高さ調整ハンドル */}
            <Box
              args={[0.05, 0.05, 0.05]}
              position={[0, partition.size.height, 0]}
            >
              <meshStandardMaterial color="#10b981" />
            </Box>

            {/* 奥行き調整ハンドル */}
            <Box
              args={[0.05, 0.05, 0.05]}
              position={[0, partition.size.height / 2, partition.size.depth / 2]}
            >
              <meshStandardMaterial color="#f59e0b" />
            </Box>
            <Box
              args={[0.05, 0.05, 0.05]}
              position={[0, partition.size.height / 2, -partition.size.depth / 2]}
            >
              <meshStandardMaterial color="#f59e0b" />
            </Box>
          </group>
        )}

        {/* サイズ表示ラベル */}
        {isSelected && (
          <Text
            position={[0, partition.size.height + 0.2, 0]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {`${partition.size.width.toFixed(1)}m × ${partition.size.height.toFixed(1)}m × ${partition.size.depth.toFixed(1)}m`}
          </Text>
        )}
      </group>
    </Interactive>
  );
}
