<template>
  <Wrapper :app="app" :use-h1="false">
    <main class="Container">
      <article v-if="member" class="Article">
        <div class="Article_Eyecatch">
          <template v-if="member.profileImage">
            <img
              :src="member.profileImage.src"
              alt=""
              width="1080"
              height="680"
            />
          </template>
          <template v-else>
            <div class="Article_EyecatchEmpty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60px"
                height="60px"
                viewBox="0 0 24 24"
                fill="#CCCCCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
                />
              </svg>
            </div>
          </template>
        </div>
        <p v-if="member.position" class="Article_Category">
          {{ member.position.name }}
        </p>
        <h1 class="Article_Title">{{ member.fullName }}</h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="Article_Body" v-html="member.profile"></div>
      </article>
    </main>
  </Wrapper>
</template>

<script>
import { getMemberBySlug } from 'api/member'
import { getApp } from 'api/app'

export default {
  async asyncData({ $config, params }) {
    const member = await getMemberBySlug($config, params.slug)
    const app = await getApp($config)
    return {
      member,
      app,
    }
  },
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
.Article_EyecatchEmpty {
  background: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 0;
  padding: 64% 0 0 0;
  position: relative;
}
.Article_EyecatchEmpty svg {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -30px 0 0 -30px;
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
.Article_Body >>> h1,
.Article_Body >>> h2,
.Article_Body >>> h3,
.Article_Body >>> h4,
.Article_Body >>> h5,
.Article_Body >>> h6 {
  padding: 0;
  margin: 40px 0 24px 0;
  line-height: 1.4;
}
.Article_Body >>> h1 { font-size: 2.4rem; }
.Article_Body >>> h2 { font-size: 2.2rem; }
.Article_Body >>> h3 { font-size: 2rem; }
.Article_Body >>> h4 { font-size: 1.8rem; }
.Article_Body >>> h5 { font-size: 1.6rem; }
.Article_Body >>> h6 { font-size: 1.4rem; }
.Article_Body >>> p {
  margin: 0 0 24px 0;
}
.Article_Body >>> img {
  max-width: 100%;
  height: auto;
  margin: 32px auto;
  display: block;
}
.Article_Body >>> ul,
.Article_Body >>> ol {
  margin: 0;
  padding: 0 0 16px 40px;
}
.Article_Body >>> ul li,
.Article_Body >>> ol li {
  margin: 0 0 4px 0;
  padding: 0;
}
.Article_Body >>> ul li ul,
.Article_Body >>> ul li ol,
.Article_Body >>> ol li ol,
.Article_Body >>> ol li ul {
  padding: 0 0 0 20px;
}
.Article_Body >>> blockquote {
  border-left: 4px solid #CCC;
  padding: 0 0 0 40px;
  margin: 0 0 20px 0;
}
.Article_Body >>> pre {
  background: #333;
  color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
  margin: 0 0 20px 0;
  font-size: 1.4rem;
  line-height: 1.6;
  overflow: auto;
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
}
.Article_Body >>> code {
  border: 1px solid #ddd;
  background: #f8f8f8;
  border-radius: 4px;
  padding: 2px 4px;
  margin: 0 4px;
  color: #e01d5a;
  font-size: 1.4rem;
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
}
.Article_Body >>> pre code {
  border: none;
  background: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  color: #fff;
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
    width: 100%;
  }
}
</style>
