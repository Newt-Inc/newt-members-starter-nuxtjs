<template>
  <main class="Container">
    <article v-if="member" class="Article">
      <div class="Article_Eyecatch">
        <template v-if="member.profileImage">
          <img :src="member.profileImage.src" alt="" width="1080" height="680" />
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </template>
      </div>
      <p v-if="member.position" class="Article_Category">{{member.position.name}}</p>
      <h1 class="Article_Title">{{member.fullName}}</h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="Article_Body" v-html="member.profile"></div>
    </article>
  </main>
</template>

<script>
import { getMemberBySlug } from 'api/member'

export default {
  layout: 'sub',
  async asyncData({ $config, params }) {
    const member = await getMemberBySlug($config, params.slug)
    return {
      member
    }
  }
}
</script>

<style scoped>
.Article {
  padding: 24px;
  margin: 0 auto;
}
.Article_Eyecatch {
  margin: 0 0 16px 0;
}
.Article_Eyecatch img {
  width: 100%;
  height: auto;
}
.Article_Category {
  margin: 0;
  padding: 0;
  color: #888;
}
.Article_Title {
  margin: 0 0 12px 0;
  padding: 0;
  font-size: 1.8rem;
  line-height: 1.5;
}
.Article_Body >>> p {
  margin: 0 0 24px 0;
}
.Article_Body >>> img {
  max-width: 100%;
  height: auto;
  margin: 32px auto;
  display: block;
}
@media (min-width: 600px) {
  .Container {
    flex: 1 auto;
    display: flex;
  }
  .Article {
    max-width: 700px;
    padding: 60px;
    margin: auto;
  }
}
</style>