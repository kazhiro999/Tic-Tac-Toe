import {
  GroupListResponse,
  GroupUsersResponse,
  OrgDescendentResponse,
  OrgRootTreeResponse,
  OrgUsersResponse,
  SearchDirectoryResponse,
  SearchGroupResponse,
  SearchOrganizationResponse,
  CustomItemsResponse
} from './types';

export type Repositories = {
  searchDirectory: (searchText: string) => Promise<SearchDirectoryResponse>;
  searchOrganization: (
    searchText: string
  ) => Promise<SearchOrganizationResponse>;
  searchGroup: (searchText: string) => Promise<SearchGroupResponse>;
  fetchOrgRootTree: () => Promise<OrgRootTreeResponse>;
  fetchOrgDescendent: (
    organizationId: string
  ) => Promise<OrgDescendentResponse>;
  fetchOrgUsers: (
    organizationId: string,
    offset: number
  ) => Promise<OrgUsersResponse>;
  fetchGroupList: (offset: number) => Promise<GroupListResponse>;
  fetchGroupUsers: (
    groupId: string,
    offset: number
  ) => Promise<GroupUsersResponse>;
  fetchCustomItems: () => Promise<CustomItemsResponse>;
};

export const emptyRepositories: Repositories = {
  searchDirectory: (searchText: string) =>
    Promise.resolve({ users: [], orgs: [], groups: [] }),
  searchOrganization: (searchText: string) => Promise.resolve({ entities: [] }),
  searchGroup: (searchText: string) => Promise.resolve({ entities: [] }),
  fetchOrgRootTree: () =>
    Promise.resolve({
      orgs: {},
      tree: {}
    }),
  fetchOrgDescendent: (organizationId: string) =>
    Promise.resolve({
      orgs: {},
      tree: {}
    }),
  fetchOrgUsers: (organizationId: string, offset: number) =>
    Promise.resolve({ entities: [] }),
  fetchGroupList: (offset: number) => Promise.resolve({ entities: [] }),
  fetchGroupUsers: (groupId: string, offset: number) =>
    Promise.resolve({ entities: [] }),
  fetchCustomItems: () => Promise.resolve({ items: [] })
};
