import React, { useMemo } from "react";

import FuelRod from "../components/FuelRod";

// todo texture for shielding
export default function Assembly({ position }) {

  return (
    // object
    <object3D name="fuel-assembly" position={position}>
      {/* four bundles make an assembly */}
      <FuelRod position={[0, 1.1, 0]} />
      <FuelRod position={[1, 1.1, 0]} />
      <FuelRod position={[1, 1.1, -1]} />
      <FuelRod position={[0, 1.1, -1]} />
    </object3D>
  );
}
