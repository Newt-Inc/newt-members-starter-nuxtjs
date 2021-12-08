<template>
  <Wrapper :app="app">
    <main class="Container">
      <Cover
        v-if="app && app.cover && app.cover.value"
        :img="app.cover.value"
      />
      <div class="Members">
        <Dropdown :positions="positions" :selected="selected" />
        <div class="Inner">
          <MemberCard
            v-for="member in members"
            :key="member._id"
            :member="member"
          />
        </div>
        <Pagination
          :total="total"
          :current="pageNumber"
          :base-path="`/position/${selected}`"
        />
      </div>
    </main>
  </Wrapper>
</template>

<script>
import { getMembers } from 'api/member'
import { getPositions } from 'api/position'
import { getApp } from 'api/app'

export default {
  async asyncData({ $config, redirect, params }) {
    const pageNumber = Number(params.page)
    if (Number.isNaN(pageNumber)) return redirect(302, '/')
    const { positions } = await getPositions($config)
    const position = positions.find(
      (_position) => _position.slug === params.slug
    )
    const { members, total } = await getMembers($config, {
      position: (position && position._id) || '',
      page: pageNumber,
    })
    const app = await getApp($config)

    return {
      members,
      total,
      positions,
      selected: params.slug || '',
      pageNumber,
      app,
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.Members {
  padding: 24px 24px 40px 24px;
  margin: 0 auto;
}
.Inner {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 600px) {
  .Members {
    padding: 60px;
  }
}
@media (min-width: 960px) {
  .Members {
    max-width: 1024px;
  }
}
</style>
