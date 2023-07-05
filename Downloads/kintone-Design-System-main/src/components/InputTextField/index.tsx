/**
 * @fileoverview 入力フォームコンポーネント
 * ラベルやエラーメッセージを細かくカスタマイズしたい場合は、InputTextを利用してください。
 */

import * as React from 'react';
import { useComponentId } from '../../hooks/useComponentId';
import { FormFieldMessage, FORM_FIELD_MESSAGE_TYPE } from '../FormFieldMessage';
import { type InputTextHeight, InputText } from '../InputText';
import { FormField } from './FormField';
import { FormFieldLabel } from './FormFieldLabel';

type Props = {
  /**
   * Label を表示するかどうか。<code>true</code>の場合、Label を表示します。
   */
  labelShown?: boolean;
  /**
   * Label の値。Label の表示／非表示にかかわらず<code>label</code>は必須です。非表示の場合でも、スクリーンリーダーは<code>label</code>の値を読み上げます。
   */
  label: string; // ラベルの表示/非表示に関わらず、InputText が何の入力テキストなのか示すために必要となる
  /**
   * InputTextFieldの入力値。
   */
  value: string;
  /**
   * changeイベント発生時のコールバック。引数の<code>value</code>はInputTextFieldの入力値です。
   */
  changeValue: (value: string) => void;
  /**
   * 入力が必須かどうか。<code>true</code>の場合、Label の右横にRequiredIconを表示します。
   */
  required?: boolean;
  /**
   * HelperText の値です。値を指定した場合、Success形式のメッセージを表示します。<code>null</code>を指定した場合、メッセージは表示しません。
   */
  successMessage?: string | null;
  /**
   * HelperText の値です。値を指定した場合、Error形式のメッセージを表示します。<code>null</code>を指定した場合、メッセージは表示しません。
   */
  errorMessage?: string | null;
  /**
   * InputTextBoxの高さ。
   * <code>'small'</code>は32px、<code>'medium'</code>は40px。
   */
  height?: InputTextHeight;
};

const Component: React.VFC<Props> = ({
  labelShown = true,
  label,
  value,
  changeValue,
  required,
  successMessage,
  errorMessage,
  height
}) => {
  const id = useComponentId();
  const labelId = `${id}-label`;
  const messageId = `${id}-message`;
  const success = successMessage !== null && successMessage !== undefined;
  const error = errorMessage !== null && errorMessage !== undefined;

  return (
    <FormField>
      {labelShown && (
        <FormFieldLabel id={labelId} required={required}>
          {label}
        </FormFieldLabel>
      )}
      <InputText
        required={required}
        value={value}
        valid={!error}
        changeValue={changeValue}
        aria-describedby={success || error ? messageId : undefined}
        aria-labelledby={labelShown ? labelId : undefined}
        aria-label={!labelShown ? label : undefined}
        height={height}
      />
      {success && (
        <FormFieldMessage id={messageId} type={FORM_FIELD_MESSAGE_TYPE.SUCCESS}>
          {successMessage}
        </FormFieldMessage>
      )}
      {error && (
        <FormFieldMessage id={messageId} type={FORM_FIELD_MESSAGE_TYPE.ERROR}>
          {errorMessage}
        </FormFieldMessage>
      )}
    </FormField>
  );
};

export type InputTextFieldProps = Props;

export const InputTextField = Component;
