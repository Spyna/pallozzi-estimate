import React, { useState } from "react";

export interface PallozziWeight {
  read: number;
  write: number;
  update: number;
}

export interface PallozziConfig {
  color: {
    actor: string;
  };
  weights: PallozziWeight;
}

export const defaultPallozziConfig: PallozziConfig = {
  color: {
    actor: "lightblue",
  },
  weights: {
    read: 1,
    write: 5,
    update: 3,
  },
};

export interface PallozziContextType {
  config: PallozziConfig;
  updateConfig: (newConfig: PallozziConfig) => void;
}

export const PallozziContext = React.createContext<PallozziContextType>(
  null as any
);

export const withContext = (WrappedComponent: React.ElementType) => {
  return function Hoc() {
    const [config, setConfig] = useState(defaultPallozziConfig);

    function updateConfig(newConfig: PallozziConfig) {
      setConfig({
        ...config,
        ...newConfig,
      });
    }

    return (
      <PallozziContext.Provider value={{ config, updateConfig }}>
        <WrappedComponent />
      </PallozziContext.Provider>
    );
  };
};
