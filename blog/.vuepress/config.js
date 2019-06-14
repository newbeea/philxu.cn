module.exports = {
  title: 'Phil Xu',
  description: 'webgl vue threejs developer',
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     * Workaround of https://github.com/ulivz/vuepress-plugin-blog/issues/1
     */
    modifyBlogPluginOptions(blogPlugnOptions) {
      const archiveDirectoryClassifierIndex = blogPlugnOptions.directories.findIndex(d => d.id === 'archive')
      blogPlugnOptions.directories.splice(archiveDirectoryClassifierIndex, 1)
      const writingDirectoryClassifier = {
        id: 'projects',
        dirname: '_projects',
        path: '/projects/',
        layout: 'IndexProjects',
        itemLayout: 'Post',
        itemPermalink: '/projects/:year/:month/:day/:slug',
        pagination: {
          perPagePosts: 5,
        },
      }
      
      blogPlugnOptions.directories.push(writingDirectoryClassifier)
      return blogPlugnOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: '博客',
        link: '/',
      },
      {
        text: '项目',
        link: '/projects/',
      },
      {
        text: '标签',
        link: '/tag/',
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
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'MIT Licensed | Copyright © 2018-present Vue.js',
          link: '',
        },
      ],
    },
  },
}
