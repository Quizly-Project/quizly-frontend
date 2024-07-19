import React from 'react';
import { useThree } from '@react-three/fiber';
import { AxesHelper, GridHelper } from 'three';

const CoordinateHelpers = ({ size = 10, divisions = 10 }) => {
  const { scene } = useThree();

  React.useEffect(() => {
    // 축 헬퍼 추가
    const axesHelper = new AxesHelper(size);
    scene.add(axesHelper);

    // 그리드 헬퍼 추가
    const gridHelper = new GridHelper(size, divisions);
    scene.add(gridHelper);

    return () => {
      scene.remove(axesHelper);
      scene.remove(gridHelper);
    };
  }, [scene, size, divisions]);

  return null;
};

export default CoordinateHelpers;
