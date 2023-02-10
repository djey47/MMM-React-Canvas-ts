import { createContext } from 'react';

const ConfigurationContext = createContext<ModuleConfiguration | undefined>({});
export default ConfigurationContext;
