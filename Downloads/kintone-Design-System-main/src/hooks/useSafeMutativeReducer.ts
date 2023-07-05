import { produce } from 'immer';
import { Dispatch, Reducer, useMemo, useReducer } from 'react';

/**
 * @fileoverview 破壊的な状態の状態変更の書き方を許容するReducerを生成するHooks
 * ReduxToolKitと同様にImmerを使って実現している
 * [useImmer](https://github.com/immerjs/use-immer/blob/master/src/index.ts)
 */

type UseSafeMutativeReducer<S = any, A = any> = (
  reducer: Reducer<S, A>,
  initialState: S
) => [S, Dispatch<A>];

export const useSafeMutativeReducer: UseSafeMutativeReducer = (
  reducer,
  initialState
) => {
  const cachedReducer = useMemo(() => produce(reducer), [reducer]);
  return useReducer(cachedReducer, initialState);
};
