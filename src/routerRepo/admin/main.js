export default [

    {
        path: "/admin/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/pages/Login.vue"),
    },

    {
        path: "/admin/articles",
        name: "allarticles",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/articles/List.vue"),
        meta: { requiredAuth: true },

    },
    {
        path: "/admin/articles/new/:id?",
        name: "newarticle",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/articles/Create.vue"),
        meta: {
            requiredAuth: true,
            sitemap: {
                // For dynamic routes with multiple parameters,
                // each slug must be an object with a key for
                // each parameter
                slugs: [
                    {
                        id: 1,
                        title: 'Create',
                        category: 'General',
                    },
                ]
            }
        },

    },
    {
        path: "/admin/projects",
        name: "allprojects",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/projects/List.vue"),
        meta: { requiredAuth: true },

    },
    {
        path: "/admin/projects/new/:id?",
        name: "newproject",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/projects/Create.vue"),
        meta: {
            requiredAuth: true,
            sitemap: {
                // For dynamic routes with multiple parameters,
                // each slug must be an object with a key for
                // each parameter
                slugs: [
                    {
                        id: 1,
                        title: 'Create Project',
                        category: 'General',
                    },
                ]
            }
        },

    },
    {
        path: "/admin/category",
        name: "allcategory",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/category/List.vue"),
        meta: { requiredAuth: true },

    },
    {
        path: "/admin/category/new/:id?",
        name: "newcategory",
        component: () =>
            import(/* webpackChunkName: "about" */ "../../components/Admin/category/Create.vue"),
        meta: {
            requiredAuth: true,
            sitemap: {
                // For dynamic routes with multiple parameters,
                // each slug must be an object with a key for
                // each parameter
                slugs: [
                    {
                        id: 1,
                        title: 'Create Category',
                        category: 'General',
                    },
                ]
            }
        },

    },
]


