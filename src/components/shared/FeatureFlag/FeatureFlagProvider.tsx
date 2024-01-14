import React, { createContext } from 'react';

interface FeatureFlagValue {
  name: string;
  isActive: boolean;
}

interface IProps {
  values: FeatureFlagValue[];
}

const FeatureFlagContext = createContext([]);

const FeatureFlagProvider: React.FunctionComponent<IProps> = ({ values, children }) => (
  <FeatureFlagContext.Provider value={values}>{children}</FeatureFlagContext.Provider>
);

export { FeatureFlagContext };
export default FeatureFlagProvider;
