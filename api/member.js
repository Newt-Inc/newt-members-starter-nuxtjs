import { createClient } from 'newt-client-js'
const MEMBER_MODEL_NAME = 'member'

export const getMembers = async (config, options={ search: '', position: '', page: 1, query: {} }) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: 'cdn',
    })
    const _options = {
      search: '',
      position: '',
      page: 1,
      query: {},
      ...options,
    }
    const query = {
      ...(_options.query || {})
    }
    if (_options.search) {
      query.or = [
        {
          fullName: {
            match: _options.search
          }
        },
        {
          profile: {
            match: _options.search
          }
        }
      ]
    }
    if (_options.position) {
      query.position = _options.position
    }
    const page = _options.page || 1
    const limit = config.pageLimit || 10
    const skip = (page - 1) * limit
    const result = await client.getContents({
      appUid:config.appUid,
      modelUid: MEMBER_MODEL_NAME,
      query: {
        depth: 2,
        limit,
        skip,
        ...query
      }
    })
    return {
      ...result,
      members: result.items,
    }
  } catch (err) {
    return {
      members: [],
      total: 0,
    }
  }
}

export const getMemberBySlug = async (config, slug) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: 'cdn',
    })
    const result = await client.getContents({
      appUid:config.appUid,
      modelUid: MEMBER_MODEL_NAME,
      query: {
        depth: 2,
        limit: 1,
        slug,
      }
    })
    return result.items.length === 1 ? result.items[0] : null
  } catch (err) {
    return null
  }
}