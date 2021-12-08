import { createClient } from 'newt-client-js'
const POSITION_MODEL_NAME = 'position'

export const getPositions = async (config) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: config.apiType,
    })
    const result = await client.getContents({
      appUid: config.appUid,
      modelUid: POSITION_MODEL_NAME,
      query: {
        depth: 1,
      },
    })
    return {
      ...result,
      positions: result.items,
    }
  } catch (err) {
    return {
      positions: [],
      total: 0,
    }
  }
}
