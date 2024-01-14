/**
 * Functions for working with feature flags that toggle on and off certain functionality in the application.
 * @author Andrew Jarombek
 * @since 7/21/2020
 */

interface FeatureValue {
  name: string;
  isActive: boolean;
}

/**
 * Get a list of feature flag objects (the name of the flag and whether it is toggled on or off) from
 * environment variables.
 */
const getFeatureFlags: () => FeatureValue[] = () => {
  const flags = [];

  for (const name in process.env) {
    if (name.startsWith('FEATURE_')) {
      flags.push({
        name: name.substring(8),
        isActive: process.env[name] === 'true',
      });
    }
  }

  return flags;
};

export { getFeatureFlags };
