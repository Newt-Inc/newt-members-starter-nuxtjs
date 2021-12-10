<template>
  <Wrapper :app="app">
    <main class="Container">
      <Cover
        v-if="app && app.cover && app.cover.value"
        :img="app.cover.value"
      />
      <div class="Members">
        <Dropdown :positions="positions" />
        <div class="Inner">
          <MemberCard
            v-for="member in members"
            :key="member._id"
            :member="member"
          />
        </div>
        <Pagination :total="total" :current="1" />
      </div>
    </main>
  </Wrapper>
</template>

<script>
import { getMembers } from 'api/member'
import { getPositions } from 'api/position'
import { getApp } from 'api/app'
import { getSiteName } from 'utils/head'

export default {
  async asyncData(context) {
    const [resMembers, resPositions, app] = await Promise.all([
      getMembers(context.$config),
      getPositions(context.$config),
      getApp(context.$config),
    ])
    return {
      members: resMembers.members,
      total: resMembers.total,
      positions: resPositions.positions,
      app,
    }
  },
  head() {
    return {
      title: getSiteName(this.app),
    }
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
