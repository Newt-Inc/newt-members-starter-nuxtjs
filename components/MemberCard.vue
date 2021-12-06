<template>
  <article v-if="member" class="Article">
    <NuxtLink :to="`/member/${member.slug}`" class="Article_Link">
      <div class="Article_Eyecatch">
        <template v-if="member.profileImage">
          <img :src="member.profileImage.src" alt="" />
        </template>
        <template v-else>
          <div class="Article_EyecatchEmpty">
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
          </div>
        </template>
      </div>
      <div class="Article_Inner">
        <p class="Article_Category">Founder</p>
        <h2 class="Article_Title">{{member.fullName}}</h2>
      </div>
    </NuxtLink>
  </article>
</template>

<script>
import { formatDate } from 'utils/date'

export default {
  props: {
    member: {
      type: Object,
      default: null
    }
  },
  computed: {
    authorName() {
      return (this.member.author && this.member.author.fullName) || 'NO NAME'
    }
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? formatDate(dateStr) : ''
    }
  }
}
</script>

<style scoped>
.Article {
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.05);
  border-radius: 4px;
  margin: 0 0 16px 0;
  width: 100%;
}
.Article_Link {
  display: block;
  padding: 0;
  line-height: 1.5;
  color: #333;
  text-decoration: none;
  border-radius: 3px;
  transition: background .2s;
  background: #fff;
  overflow: hidden;
}
.Article_Link:hover {
  background: #f8f8f8;
}
.Article_Link:active {
  background: none;
  transition: none;
}
.Article_Eyecatch {
  width: 100%;
  position: relative;
}
.Article_Eyecatch::before {
  content: "";
  padding-top: 54%;
  display: block;
}
.Article_EyecatchInner {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.Article_Eyecatch > img {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
  width: 100%;
  height: 100%;
}
.Article_Inner {
  padding: 16px;
}
.Article_Category {
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  color: #888;
}
.Article_Title {
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
}
@media (min-width: 600px) {
  .Articles {
    padding: 60px;
  }
  .Article {
    margin: 0 12px 24px 0;
    width: calc(50% - 14px);
  }
  .Article:nth-child(2n) {
    margin: 0 0 24px auto;
  }
}
@media (min-width: 960px) {
  .Articles {
    max-width: 1024px;
  }
  .Article {
    margin: 0 24px 24px 0;
    width: calc(33.333% - 18px);
  }
  .Article:nth-child(2n) {
    margin: 0 24px 24px 0;
  }
  .Article:nth-child(3n) {
    margin: 0 0 24px 0;
  }
}
</style>