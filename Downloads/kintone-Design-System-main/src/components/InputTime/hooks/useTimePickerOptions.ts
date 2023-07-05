import { useState } from 'react';
import { makeUniqueIdForUi } from '../../../functions/makeUniqueIdForUi';
import { createOptions } from '../modules/functions';

export const useTimePickerOptions = (isAMPMNotation: boolean) => {
  const [id] = useState(makeUniqueIdForUi());
  return createOptions(id, isAMPMNotation);
};
