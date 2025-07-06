'use client';

import React from 'react';

export default function InstructionPanel() {
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-xs">
      <h4 className="font-bold mb-2">使用方法</h4>
      <ul className="text-sm space-y-1">
        <li>• ARボタンでAR開始</li>
        <li>• パーティションタップで選択</li>
        <li>• 左パネルでサイズ調整</li>
        <li>• ドラッグで位置移動</li>
      </ul>
    </div>
  );
}
