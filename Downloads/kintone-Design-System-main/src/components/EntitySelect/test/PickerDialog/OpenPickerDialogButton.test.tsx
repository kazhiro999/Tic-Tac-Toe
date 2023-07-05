import { emptyRepositories } from '../../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from '../entitySelectRenderer';
import userEvent from '@testing-library/user-event';
import { defaultLocales } from '../../EntitySelectContext';
import { fetchOrgRootTree } from '../repositoryData';

describe('OpenPickerDialogButton', () => {
  let entitySelectRenderResult: ReturnType<typeof entitySelectRenderer>;
  let openPickerDialogButton: HTMLElement;
  beforeEach(() => {
    entitySelectRenderResult = entitySelectRenderer({
      ...entitySelectRenderInitialProps,
      repositories: {
        ...emptyRepositories,
        // 組織を返さないとpickerDialogを表示できない
        fetchOrgRootTree
      }
    });
    openPickerDialogButton =
      entitySelectRenderResult.getOpenPickerDialogButton();
  });

  test('ホバーすると組織やグループから選択する旨のツールチップが表示される', () => {
    expect(openPickerDialogButton).toHaveAttribute(
      'title',
      defaultLocales.pickerShowDialogButtonLabel
    );
  });

  test('クリックでOpen状態になる', async () => {
    userEvent.click(openPickerDialogButton);
    expect(await entitySelectRenderResult.getDialog()).toBeVisible();
  });

  test('Enterキーを押すとOpen状態になる', async () => {
    openPickerDialogButton.focus();
    userEvent.keyboard('{Enter}');
    expect(await entitySelectRenderResult.getDialog()).toBeVisible();
  });

  test('Spaceキーを押すとOpen状態になる', async () => {
    openPickerDialogButton.focus();
    // userEvent.keyboardだとスペースを押せないので、userEvent.typeでスペースを押す
    userEvent.type(openPickerDialogButton, '{Space}');
    expect(await entitySelectRenderResult.getDialog()).toBeVisible();
  });
});
