module.exports = {
  title: 'Phil Xu',
  description: 'webgl vue threejs developer',
  plugins: ['run'],
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     * Workaround of https://github.com/ulivz/vuepress-plugin-blog/issues/1
     */
    modifyBlogPluginOptions(blogPlugnOptions) {
      // const archiveDirectoryClassifierIndex = blogPlugnOptions.directories.findIndex(d => d.id === 'archive')
      // blogPlugnOptions.directories.splice(archiveDirectoryClassifierIndex, 1)
      const writingDirectoryClassifier = {
        id: 'projects',
        dirname: '_projects',
        path: '/',
        layout: 'IndexProjects',
        itemLayout: 'Post',
        itemPermalink: '/projects/:year/:month/:day/:slug',
        pagination: {
          perPagePosts: 5,
        },
      }
      const postDirectoryClassifier = {
        id: 'post',
        dirname: '_posts',
        path: '/posts',
        layout: 'IndexPost',
        itemLayout: 'Post',
        itemPermalink: '/:year/:month/:day/:slug',
        pagination: {
          perPagePosts: 5,
        },
      }
      // blogPlugnOptions.directories.push(writingDirectoryClassifier)
      blogPlugnOptions.directories.splice(0, 1, writingDirectoryClassifier)
      blogPlugnOptions.directories.splice(1, 1, postDirectoryClassifier)
      return blogPlugnOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      // {
      //   text: '博客',
      //   link: '/',
      // },
      {
        text: '项目',
        link: '/',
      },
      {
        text: '标签',
        link: '/tag/',
      },
      {
        text: '关于',
        link: '/2019/06/26/about-me/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/newbeea',
        }
      ],
      copyright: [
        {
          text: '黑ICP备20001731号',
          link: 'http://beian.miit.gov.cn/',
        },
        {
          text: 'MIT Licensed | Copyright © 2018-present Phil Xu',
          link: '',
        },
      ],
    },
  },
}
