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
          :current="1"
          :base-path="`/position/${selected}`"
        />
      </div>
    </main>
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSiteName } from 'utils/head'

export default {
  async asyncData({ $config, store, params }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchPositions', $config)

    const position = store.getters.positions.find(
      (position) => position.slug === params.slug
    )
    await store.dispatch('fetchMembers', {
      ...$config,
      position: (position && position._id) || '',
    })

    return {
      selected: params.slug || '',
    }
  },
  head() {
    return {
      title: getSiteName(this.app),
    }
  },
  computed: {
    ...mapGetters(['app', 'members', 'total', 'positions']),
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
