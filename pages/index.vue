<template>
  <main class="Container">
    <Cover img="https://as1.ftcdn.net/v2/jpg/03/45/18/76/1000_F_345187680_Eo4rKPDmdB6QTaGXFwU4NE5BaLlpGooL.jpg" />
    <div class="Members">
      <Dropdown :positions="positions" />
      <div class="Inner">
        <MemberCard v-for="member in members" :key="member._id" :member="member" />
      </div>
      <Pagination :total="total" :current="1" />
    </div>
  </main>
</template>

<script>
import { getMembers } from 'api/member'
import { getPositions } from 'api/position'

export default {
  async asyncData(context) {
    const [resMembers, resPositions] = await Promise.all([
      getMembers(context.$config),
      getPositions(context.$config),
    ])
    return {
      members: resMembers.members,
      total: resMembers.total,
      positions: resPositions.positions,
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