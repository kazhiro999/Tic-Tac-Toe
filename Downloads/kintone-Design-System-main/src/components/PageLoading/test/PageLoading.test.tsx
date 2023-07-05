import { render, screen, cleanup } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { getDocumentBody } from '../../../functions/document';
import { PageLoading } from '..';
import { Overlay } from '../Overlay';

describe('PageLoading', () => {
  test('Loadingが表示されるとinert属性が適切な値に上書きされ、Loadingが非表示になると元の値に戻る', () => {
    const body = document.body;
    // `inert`属性は真偽属性であり、真偽属性には属性の正規名か空文字しか許可されない。
    // したがって、inert="inert"・inert=""、・inert属性なしの３種類の挙動を検証する。
    // inert属性: https://momdo.github.io/html/interaction.html#the-inert-attribute
    // 真偽属性: https://momdo.github.io/html/common-microsyntaxes.html#boolean-attribute
    body.insertAdjacentHTML(
      'afterbegin',
      '<div inert="inert" data-testid="Inert" />'
    );
    body.insertAdjacentHTML('afterbegin', '<div inert data-testid="Empty" />');
    body.insertAdjacentHTML('afterbegin', '<div data-testid="Null" />');

    render(<PageLoading shown />);

    // inert属性が有効な値に上書きされることを検証する。
    // 有効なinert属性の値には'inert'と''の２種類がある。
    // 以下の記法であればどちらの値で実装されても正しく検証できるが、まだ型定義がinertに対応していないため、toHaveAttribute()で代用する。
    // expect(element.inert).toBeTruthy();
    // 型定義を更新するプルリクエスト: https://github.com/facebook/react/pull/24730
    expect(screen.getByTestId('Inert')).toHaveAttribute('inert', '');
    expect(screen.getByTestId('Empty')).toHaveAttribute('inert', '');
    expect(screen.getByTestId('Null')).toHaveAttribute('inert', '');

    cleanup();

    // inert属性が元の値に戻ることを検証する。
    expect(screen.getByTestId('Inert')).toHaveAttribute('inert', 'inert');
    expect(screen.getByTestId('Empty')).toHaveAttribute('inert', '');
    expect(screen.getByTestId('Null')).not.toHaveAttribute('inert');
  });
});

describe('Overlay', () => {
  const UIEventTarget = () => {
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    return <div tabIndex={0} data-testid="event-target" />;
  };

  test('clickイベントがバブリングしない', () => {
    // setup
    const handleClickBody = jest.fn();
    const body = getDocumentBody();
    body.addEventListener('click', handleClickBody);
    render(
      <Overlay>
        <UIEventTarget />
      </Overlay>
    );

    // exercise
    const eventTarget = screen.getByTestId('event-target');
    userEvent.click(eventTarget);

    // verify
    expect(handleClickBody).not.toBeCalled();
  });

  test('keyboardイベントがバブリングしない', () => {
    // setup
    const handleKeydownBody = jest.fn();
    const body = getDocumentBody();
    body.addEventListener('keydown', handleKeydownBody);
    render(
      <Overlay>
        <UIEventTarget />
      </Overlay>
    );
    // exercise
    const eventTarget = screen.getByTestId('event-target');
    eventTarget.focus();
    userEvent.keyboard('{escape}');

    // verify
    expect(handleKeydownBody).not.toBeCalled();
  });
});
