import { Repositories } from '../modules/repositories';
import { createDummyUser } from '../../../functions/testing/users';
import { createDummyOrganization } from '../../../functions/testing/organizations';
import { createDummyGroup } from '../../../functions/testing/groups';
import { LANGUAGE } from '../../../models/language';
import { ResponseTree, USER_FETCH_SIZE } from '../modules/types';

const USER_SIZE = 201; // ReadMoreButtonをrenderしたいため、ユーザー数を100件以上にする

export const repositories: Repositories = {
  searchDirectory: () =>
    Promise.resolve({
      users: createDummyUsers(),
      orgs: createDummyOrgs(),
      groups: createDummyGroups()
    }),
  searchOrganization: () =>
    Promise.resolve({
      entities: createDummyOrgs()
    }),
  searchGroup: () =>
    Promise.resolve({
      entities: createDummyGroups()
    }),
  fetchOrgRootTree: () =>
    Promise.resolve({
      orgs: {
        '1': createDummyOrganization({ id: '1', name: '組織1' }),
        '2': createDummyOrganization({
          id: '2',
          name: '長い名前の組織2 長い名前の組織2 長い名前の組織2',
          hasChildren: true
        }),
        '3': createDummyOrganization({
          id: '3',
          name: '組織3',
          hasChildren: true
        }),
        '4': createDummyOrganization({ id: '4', name: '組織4' }),
        '5': createDummyOrganization({
          id: '5',
          name: '長い名前の組織2-1 長い名前の組織2-1 長い名前の組織2-1 ',
          hasChildren: true
        }),
        '6': createDummyOrganization({
          id: '6',
          name: '長い名前の組織2-1-1 長い名前の組織2-1-1 長いな目の組織2-1-1 ',
          hasChildren: true
        }),
        '7': createDummyOrganization({
          id: '7',
          name: '長い名前の組織2-1-1-1 長い名前の組織2-1-1-1 長い名前の組織2-1-1-1 ',
          hasChildren: true
        }),
        '8': createDummyOrganization({
          id: '8',
          name: '長い名前の組織2-1-1-1-1 長い名前の組織2-1-1-1-1 長い名前の組織2-1-1-1-1 '
        }),
        '9': createDummyOrganization({ id: '9', name: '組織3-1' }),
        '10': createDummyOrganization({
          id: '10',
          name: 'LONG NAME ORGANIZATION ORGANIZATION ORGANIZATION'
        }),
        '11': createDummyOrganization({
          id: '11',
          name: 'LONG_NAME_ORGANIZATION_ORGANIZATION_ORGANIZATION'
        })
      },
      tree: {
        'tree-id': [
          { '1': [] } as ResponseTree,
          {
            '2': [{ '5': [{ '6': [{ '7': [{ '8': [] }] }] }] }]
          } as ResponseTree,
          { '3': [{ '9': [] }] } as ResponseTree,
          { '4': [] } as ResponseTree,
          { '10': [] } as ResponseTree,
          { '11': [] } as ResponseTree
        ]
      }
    }),
  fetchOrgDescendent: () =>
    Promise.resolve({
      orgs: {},
      tree: {}
    }),
  fetchOrgUsers: (organizationId: string, offset: number) => {
    // ユーザーは100件表示され、101件以降は表示されず、ReadMoreButtonをrenderする
    // offsetには、0→101→201がわたってくる
    // see: module/operations.ts fetchMoreGroupUsersInPickerDialog
    const userFetchSize = Math.min(USER_SIZE - offset, USER_FETCH_SIZE);
    const userIds = [...Array(userFetchSize)].map((_, i) => i + offset);
    const users = userIds.map((id) =>
      createDummyUser({ id: `${id}`, name: `ユーザー${id}` })
    );
    return Promise.resolve({
      entities: users
    });
  },
  fetchGroupList: () =>
    Promise.resolve({
      entities: createDummyGroups()
    }),
  fetchGroupUsers: () =>
    Promise.resolve({
      entities: createDummyUsers()
    }),
  fetchCustomItems: () => Promise.resolve({ items: [] })
};

export const selectedValues = [
  createDummyUser(),
  createDummyUser({
    id: '2',
    code: 'user2',
    name: 'LONG NAME USER USER USER USER USER'
  }),
  createDummyOrganization(),
  createDummyOrganization({
    id: '2',
    code: 'org2',
    name: 'LONG NAME ORGANIZATION ORGANIZATION ORGANIZATION ORGANIZATION'
  }),
  createDummyGroup(),
  createDummyGroup({
    id: '2',
    name: 'LONG NAME GROUP GROUP GROUP GROUP GROUP GROUP GROUP GROUP'
  }),
  createDummyGroup({
    id: '3'
  }),
  createDummyOrganization({
    id: '3',
    code: 'org3',
    name: '組織3',
    localName: 'そしき3',
    localNameLocale: LANGUAGE.JA
  }),
  createDummyUser({
    id: '3',
    code: 'user3',
    name: 'ユーザー3',
    localName: 'ゆーざー3',
    localNameLocale: LANGUAGE.JA
  })
];

const createDummyUsers = () => [
  createDummyUser({ id: '1001', name: 'ユーザー1' }),
  createDummyUser({
    id: '1002',
    name: '長い名前のユーザー2 長い名前のユーザー2 長い名前のユーザー2'
  }),
  createDummyUser({ id: '1003', name: 'ユーザー3' })
];

const createDummyGroups = () => [
  createDummyGroup({ id: '3001', name: 'グループ1' }),
  createDummyGroup({
    id: '3002',
    name: '長い名前のグループ2 長い名前のグループ2 長い名前のグループ2'
  }),
  createDummyGroup({ id: '3003', name: 'グループ3' })
];

const createDummyOrgs = () => [
  createDummyOrganization({ id: '1', name: '組織1' }),
  createDummyOrganization({
    id: '2',
    name: '長い名前の組織2 長い名前の組織2 長い名前の組織2 ',
    hasChildren: true
  }),
  createDummyOrganization({
    id: '3',
    name: '組織3',
    hasChildren: true
  }),
  createDummyOrganization({
    id: '4',
    name: 'LONG NAME ORGANIZATION ORGANIZATION ORGANIZATION',
    hasChildren: true
  }),
  createDummyOrganization({
    id: '5',
    name: 'LONG_NAME_ORGANIZATION_ORGANIZATION_ORGANIZATION',
    hasChildren: true
  })
];
