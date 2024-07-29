import React, { useEffect, useState } from 'react';
import { usePerf } from 'r3f-perf';

const PerfMonitor = () => {
  const { gl, info } = usePerf();
  const [cpuUsage, setCpuUsage] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const updateMetrics = () => {
      const now = performance.now();
      const delta = now - lastTime;
      frames++;

      if (delta > 1000) {
        const fps = (frames * 1000) / delta;
        const cpuTime = info.cpu?.frame || 0;
        const gpuTime = info.gpu?.frame || 0;

        setCpuUsage((cpuTime / (1000 / fps)) * 100);
        setGpuUsage((gpuTime / (1000 / fps)) * 100);

        frames = 0;
        lastTime = now;
      }

      requestAnimationFrame(updateMetrics);
    };

    updateMetrics();
  }, [info]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Performance Monitor</h2>
      <p>Estimated CPU Usage: {cpuUsage.toFixed(2)}%</p>
      <p>Estimated GPU Usage: {gpuUsage.toFixed(2)}%</p>
    </div>
  );
};

export default PerfMonitor;
