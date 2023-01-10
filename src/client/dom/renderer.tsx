import { createRoot } from 'react-dom/client';
import MainSample from '../components/Main/MainSample';

/**
 * MagicMirror
 * HTML renderer
 */

/**
 * @returns HTML for main wrapper
 */
export const renderWrapper = (wrapperId: string): HTMLDivElement => {
  const wrapper = document.createElement('div');
  wrapper.id = wrapperId;
  wrapper.className = wrapperId;

  return wrapper;
};

/**
 * REACT gateway helper
 * @return Mounted component
 */
export const renderMainComponent = (wrapperId: string): void => {
  const wrapperElement = document.getElementById(wrapperId);
  if (!wrapperElement) {
    Log.error(`** Could not find root div with id: ${wrapperId}! Aborting.`);
    return;
  }

  const root = createRoot(wrapperElement);
  root.render(<MainSample />);
};
