<template>
  <main class="Container">
    <Cover img="https://as1.ftcdn.net/v2/jpg/03/45/18/76/1000_F_345187680_Eo4rKPDmdB6QTaGXFwU4NE5BaLlpGooL.jpg" />
    <div class="Members">
      <Dropdown :positions="positions" :selected="selected" />
      <div class="Inner">
        <MemberCard v-for="member in members" :key="member._id" :member="member" />
      </div>
      <Pagination :total="total" :current="pageNumber" :base-path="`/position/${selected}`" />
    </div>
  </main>
</template>

<script>
import { getMembers } from 'api/member'
import { getPositions } from 'api/position'

export default {
  async asyncData({ $config, redirect, params }) {
    const pageNumber = Number(params.page)
    if (Number.isNaN(pageNumber)) return redirect(302, '/')
    const { positions } = await getPositions($config)
    const position = positions.find((_position) => _position.slug === params.slug)
    const { members, total } = await getMembers($config, {
      position: (position && position._id) || '',
      page: pageNumber
    })
    
    return {
      members,
      total,
      positions,
      selected: params.slug || '',
      pageNumber,
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