
export default [
    {
        component: () =>
            import(/* webpackChunkName: "expenses" */ "../../views/Article.vue"),
        name: 'articles',
        path: '/articles/:id',
        meta: {
            index: 0,
            sitemap: {
                // For dynamic routes with multiple parameters,
                // each slug must be an object with a key for
                // each parameter
                slugs: [
                    {
                        id: "5f348f21b34c0f074c79eeb1",
                        title: '8 Useful Javascript Array Methods',
                        category: 'web development',
                    },
                    {
                        id: "5fa7fea399ed5729944bf7b6",
                        title: 'Unique tip for CSS',
                        category: 'web designs',
                    },
                    {
                        id: "6002526d7de088596f8c9799",
                        title: '3 Unique Javascript Window APIS',
                        category: 'web designs',
                    },
                    {
                        id: "600253dc7de088596f8c979a",
                        title: '6 Useful Methods For Javascript Objects',
                        category: 'web designs',
                    },
                    {
                        id: "602858ab4cdcc0cd57c870ff",
                        title: 'Automated Marketing Emails to Drive Sales Hands Free',
                        category: 'marketing',
                    },
                ],
            }
        },
        // children: [
        //     {
        //         name: 'hash',
        //         path: '#',
        //         component: () =>
        //             import(/* webpackChunkName: "studio" */ "../../views/Home.vue"),

        //     },

        // ]

    },
    {
        component: () =>
            import(/* webpackChunkName: "expenses" */ "../../views/Project.vue"),
        name: 'projects',
        path: '/projects/:id',
        meta: {
            index: 2,
            sitemap: {
                // For dynamic routes with multiple parameters,
                // each slug must be an object with a key for
                // each parameter
                slugs: [
                    {
                        id: "5f345797a57e170560e9b69c",
                        title: 'Teaching Zones App',
                        category: 'web development',
                    },
                    {
                        id: "5fe204991c6ffebd7517671c",
                        title: 'Touch it Business Card',
                        category: 'web development',
                    },
                    {
                        id: "6010387fd5224f62fb042979",
                        title: 'Smart Academy',
                        category: 'web development',
                    },
                ],

            }
        },

    },



]
