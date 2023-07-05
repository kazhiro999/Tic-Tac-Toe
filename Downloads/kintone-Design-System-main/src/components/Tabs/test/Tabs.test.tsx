import { render, fireEvent, RenderResult } from '@testing-library/react';
import { TabsProps } from '../';
import { userEvent } from '@storybook/testing-library';
import * as stories from '../stories/Tabs.stories';
import * as testStories from '../stories/Tabs.test.stories';
import { composeStories } from '@storybook/react';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const { tabItems, ...tabStories } = stories;
const { Normal } = composeStories(stories);

const renderTabs = ({
  changeTab,
  selectedTabId = tabItems[0].id
}: Pick<TabsProps, 'changeTab'> &
  Partial<Pick<TabsProps, 'selectedTabId'>>) => {
  return render(<Normal selectedTabId={selectedTabId} changeTab={changeTab} />);
};

describe('Normal', () => {
  const onChangeTabSpy = jest.fn();
  beforeEach(() => {
    onChangeTabSpy.mockReset();
  });

  const expectSelect = async (tabs: RenderResult, index: number) => {
    expect(onChangeTabSpy).toHaveBeenCalledWith(tabItems[index].id);
    expect(
      await tabs.findByRole('tab', {
        name: tabItems[index].label,
        selected: true
      })
    ).toBeInTheDocument();
  };

  it('タブをクリックしたときchangeTabが正しい引数で呼ばれる', async () => {
    // タブを描画する
    const tabs = renderTabs({ changeTab: onChangeTabSpy });

    // タブを取得する
    const tabEls = await tabs.findAllByRole('tab');

    // 先頭のタブをクリックする
    fireEvent.click(tabEls[0]);

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, 0);
  });

  it('タブにフォーカスしてENTERキーを押したときchangeTabが正しい引数で呼ばれる', async () => {
    // タブを描画する
    const tabs = renderTabs({ changeTab: onChangeTabSpy });

    // タブを取得する
    const tabEls = await tabs.findAllByRole('tab');

    // 先頭のタブにフォーカスする
    tabEls[0].focus();

    // ENTERキーを押す
    userEvent.keyboard('{enter}');

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, 0);
  });

  it('タブにフォーカスしてSPACEキーを押したときchangeTabが正しい引数で呼ばれる', async () => {
    // タブを描画する
    const tabs = renderTabs({ changeTab: onChangeTabSpy });

    // タブを取得する
    const tabEls = await tabs.findAllByRole('tab');

    // 先頭のタブにフォーカスする
    tabEls[0].focus();

    // SPACEキーを押す
    userEvent.keyboard('{space}');

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, 0);
  });

  it('selectedTabIdを設定すると適切なタブが選択される', async () => {
    // タブを描画する
    const tabs = renderTabs({ changeTab: onChangeTabSpy });

    // タブを取得する
    const tabEls = tabs.getAllByRole('tab');

    // タブの選択状態を確認する
    expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('false');
    expect(tabEls[2].getAttribute('aria-selected')).toBe('false');
  });

  it('右矢印キーでひとつ右のタブが選択される', async () => {
    // タブを描画する
    const tabs = renderTabs({ changeTab: onChangeTabSpy });

    // 先頭のタブにフォーカスする
    (await tabs.findAllByRole('tab'))[0].focus();

    // 右矢印キーを押す
    userEvent.keyboard('{arrowright}');

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, 1);
  });

  it('右端が選択中の場合、右矢印キーで選択が移動しない', async () => {
    const lastTabIndex = tabItems.length - 1;
    const lastTabId = tabItems[lastTabIndex].id;
    // 終端(右端)のタブを選択状態にして描画する
    const tabs = renderTabs({
      changeTab: onChangeTabSpy,
      selectedTabId: lastTabId
    });

    // 終端のタブにfocusする
    (await tabs.findAllByRole('tab'))[lastTabIndex].focus();

    // 右矢印キーを押す
    userEvent.keyboard('{arrowright}');

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, lastTabIndex);
  });

  it('左矢印キーでひとつ左のタブが選択される', async () => {
    const initialTabIndex = 1;
    const initialTabId = tabItems[initialTabIndex].id;
    // 指定のタブを選択状態にして描画する
    const tabs = renderTabs({
      changeTab: onChangeTabSpy,
      selectedTabId: initialTabId
    });

    // 指定のタブにフォーカスする
    (await tabs.findAllByRole('tab'))[initialTabIndex].focus();

    // 左矢印キーを押す
    userEvent.keyboard('{arrowleft}');

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, initialTabIndex - 1);
  });

  it('左端が選択中の場合、左矢印キーで選択が移動しない', async () => {
    // 先頭(左端)のタブを選択状態にして描画する
    const tabs = renderTabs({ changeTab: onChangeTabSpy });

    // 先頭のタブにfocusする
    (await tabs.findAllByRole('tab'))[0].focus();

    // 左矢印キーを押す
    userEvent.keyboard('{arrowleft}');

    // changeTabに指定した関数が正しい引数で呼ばれることを確認する
    expectSelect(tabs, 0);
  });
});

describe('a11y', () => {
  const testingStories = {
    ...composeStories(tabStories),
    ...composeStories(testStories)
  };
  for (const Story of Object.values(testingStories)) {
    assertExists(Story.storyName);
    test(Story.storyName, async () => {
      const { container } = render(<Story />);
      await Story.play?.({ canvasElement: container });
      await checkA11y(container);
    });
  }
});
