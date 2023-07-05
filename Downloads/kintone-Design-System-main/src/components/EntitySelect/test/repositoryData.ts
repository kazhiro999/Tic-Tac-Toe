import { createDummyGroup } from '../../../functions/testing/groups';
import { createDummyOrganization } from '../../../functions/testing/organizations';
import { createDummyUser } from '../../../functions/testing/users';
import { ResponseTree, USER_FETCH_SIZE } from '../modules/types';

const USER_SIZE = 110;

export const dummyUsers = {
  orgUser0: createDummyUser({
    id: '0',
    name: `組織に所属するユーザー0`
  }),
  orgUser1: createDummyUser({
    id: '1',
    name: `組織に所属するユーザー1`
  }),
  orgUser2: createDummyUser({
    id: '2',
    name: `組織に所属するユーザー2`
  }),
  groupUser0: createDummyUser({
    id: '3',
    name: `グループに所属するユーザー0`
  }),
  groupUser1: createDummyUser({
    id: '4',
    name: `グループに所属するユーザー1`
  }),
  groupUser2: createDummyUser({
    id: '5',
    name: `グループに所属するユーザー2`
  })
};

// 組織表示用
// 「組織1」、「組織2」、「組織3」の3つのノードを持つ
// 「組織2」は「組織2.1」の子ノードを持つ
export const fetchOrgRootTree = () => {
  return Promise.resolve({
    orgs: {
      '1': createDummyOrganization({ id: '1', name: '組織1' }),
      '2': createDummyOrganization({
        id: '2',
        name: '組織2',
        hasChildren: true
      }),
      '3': createDummyOrganization({ id: '3', name: '組織2.1' }),
      '4': createDummyOrganization({ id: '4', name: '組織3' })
    },
    tree: {
      'tree-id': [
        { '1': [] } as ResponseTree,
        { '2': [{ '3': [] }] } as ResponseTree,
        { '4': [] } as ResponseTree
      ]
    }
  });
};

// 組織に所属するユーザーの表示用
// 「ユーザー1」、「ユーザー2」、「ユーザー3」の3件表示
export const fetchOrgUsers = (organizationId: string, offset: number) =>
  Promise.resolve({
    entities: [dummyUsers.orgUser0, dummyUsers.orgUser1, dummyUsers.orgUser2]
  });

// 組織に所属するユーザーの表示用（ReadMoreButtonを表示する場合）
// 最大110ユーザー表示
export const fetchOrgUsersWithManyUsers = (
  organizationId: string,
  offset: number
) => {
  const userFetchSize = Math.min(USER_SIZE - offset, USER_FETCH_SIZE);
  const userIds = [...Array(userFetchSize)].map((_, i) => i + offset);
  const users = userIds.map((id) =>
    createDummyUser({
      id: `${id}`,
      name: `組織${organizationId}に所属するユーザー${id}`
    })
  );
  return Promise.resolve({ entities: users });
};

// グループ表示用
// 「グループ1」、「グループ2」、「グループ3」の3つのノードを持つ
export const fetchGroupList = () =>
  Promise.resolve({
    entities: [
      createDummyGroup({ id: '1', name: 'グループ1' }),
      createDummyGroup({ id: '2', name: 'グループ2' }),
      createDummyGroup({ id: '3', name: 'グループ3' })
    ]
  });

// グループに所属するユーザー表示用
// 「グループ1」、「グループ2」、「グループ3」の3件表示
export const fetchGroupUsers = (groupId: string, offset: number) =>
  Promise.resolve({
    entities: [
      dummyUsers.groupUser0,
      dummyUsers.groupUser1,
      dummyUsers.groupUser2
    ]
  });

// グループに所属するユーザー表示用（ReadMoreButtonを表示する場合）
// 最大110ユーザー表示される
export const fetchGroupUsersWithManyUsers = (
  groupId: string,
  offset: number
) => {
  const userFetchSize = Math.min(USER_SIZE - offset, USER_FETCH_SIZE);
  const userIds = [...Array(userFetchSize)].map((_, i) => i + offset);
  const users = userIds.map((id) =>
    createDummyUser({
      id: `${id}`,
      name: `グループ${groupId}に所属するユーザー${id}`
    })
  );
  return Promise.resolve({ entities: users });
};
