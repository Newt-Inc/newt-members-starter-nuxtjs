import { createClient } from 'newt-client-js'

export const state = () => ({
  app: null,
  members: [],
  total: 0,
  positions: [],
  currentMember: null,
})

export const getters = {
  app: (state) => state.app,
  members: (state) => state.members,
  total: (state) => state.total,
  positions: (state) => state.positions,
  currentMember: (state) => state.currentMember,
}

export const mutations = {
  setApp(state, app) {
    state.app = app
  },
  setMembers(state, members) {
    state.members = members
  },
  setTotal(state, total) {
    state.total = total
  },
  setPositions(state, positions) {
    state.positions = positions
  },
  setCurrentMember(state, currentMember) {
    state.currentMember = currentMember
  },
}

export const actions = {
  async fetchApp({ commit }, { spaceUid, token, apiType, appUid }) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const app = await client.getApp({
        appUid,
      })
      commit('setApp', app)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchMembers(
    { commit },
    {
      spaceUid,
      memberModelUid,
      token,
      apiType,
      appUid,
      pageLimit,
      search,
      position,
      page,
      query,
    }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const _query = {
        ...(query || {}),
      }
      if (search) {
        _query.or = [
          {
            fullName: {
              match: search,
            },
          },
          {
            biography: {
              match: search,
            },
          },
        ]
      }
      if (position) {
        _query.position = position
      }
      const _page = page || 1
      const _limit = pageLimit || 10
      const _skip = (_page - 1) * _limit

      const { items, total } = await client.getContents({
        appUid,
        modelUid: memberModelUid,
        query: {
          depth: 2,
          limit: _limit,
          skip: _skip,
          ..._query,
        },
      })
      commit('setMembers', items)
      commit('setTotal', total)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchPositions(
    { commit },
    { spaceUid, positionModelUid, token, apiType, appUid }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: positionModelUid,
        query: {
          depth: 1,
        },
      })
      commit('setPositions', items)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchCurrentMember(
    { commit },
    { spaceUid, memberModelUid, token, apiType, appUid, slug }
  ) {
    try {
      if (!slug) return commit('setCurrentMember', null)
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const member = await client.getFirstContent({
        appUid,
        modelUid: memberModelUid,
        query: {
          depth: 2,
          slug,
        },
      })
      commit('setCurrentMember', member)
    } catch (err) {
      return null
    }
  },
}
