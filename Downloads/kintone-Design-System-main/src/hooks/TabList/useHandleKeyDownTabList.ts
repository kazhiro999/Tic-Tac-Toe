import { isArrowLeftKey, isArrowRightKey } from '../../functions/key';

export const useHandleKeyDownTabList: <T extends Element>(
  itemCount: number,
  selectedIndex: number,
  onRequestSelect: (nextIndex: number) => void
) => React.KeyboardEventHandler<T> =
  (itemCount, selectedIndex, onRequestSelect) => (e) => {
    if (isArrowRightKey(e)) {
      onRequestSelect(
        selectedIndex < itemCount - 1 ? selectedIndex + 1 : itemCount - 1
      );
    }
    if (isArrowLeftKey(e)) {
      onRequestSelect(selectedIndex > 0 ? selectedIndex - 1 : 0);
    }
  };
