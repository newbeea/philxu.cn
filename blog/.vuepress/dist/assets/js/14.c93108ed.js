(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{210:function(t,n,a){},415:function(t,n,a){"use strict";var o=a(210);a.n(o).a},475:function(t,n,a){"use strict";a.r(n);a(3);var o=a(63),i=a.n(o),e=a(9),s=a(254),r={components:{NavigationIcon:e.l,ClockIcon:e.a},data:function(){return{paginationComponent:null}},computed:{pages:function(){return this.$pagination.pages}},created:function(){this.paginationComponent=this.getPaginationComponent()},methods:{getPaginationComponent:function(){return s.b},resolvePostDate:function(t){return i()(t).format(this.$themeConfig.dateFormat||"ddd MMM DD YYYY")}}},u=(a(415),a(7)),c=Object(u.a)(r,(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{attrs:{id:"base-list-layout"}},[a("div",{staticClass:"ui-posts"},t._l(t.pages,(function(n){return a("div",{key:n.key,staticClass:"ui-post"},[a("div",{staticClass:"ui-post-title"},[a("NavLink",{attrs:{link:n.path}},[t._v(t._s(n.title))])],1),t._v(" "),a("p",{staticClass:"ui-post-summary"},[t._v("\n        "+t._s(n.frontmatter.summary||n.summary)+"\n        ")]),t._v(" "),n.frontmatter.author?a("div",{staticClass:"ui-post-author"},[a("NavigationIcon"),t._v(" "),a("span",[t._v(t._s(n.frontmatter.author)+" in\n          "+t._s(n.frontmatter.location))])],1):t._e(),t._v(" "),n.frontmatter.date?a("div",{staticClass:"ui-post-date"},[a("ClockIcon"),t._v(" "),a("span",[t._v(t._s(t.resolvePostDate(n.frontmatter.date)))])],1):t._e()])})),0),t._v(" "),t.$pagination.length>1&&t.paginationComponent?a(t.paginationComponent,{tag:"component"}):t._e()],1)}),[],!1,null,null,null);n.default=c.exports}}]);