import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                footerShow: true
            }
        },
        {
            path: '/home/search',
            name: 'search',
            component: () =>
                import( /* webpackChunkName: "search" */ '../views/home/search/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/scroll',
            name: 'scroll',
            component: () =>
                import( /* webpackChunkName: "search" */ '../views/find/scroll.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/home/popup',
            name: 'popup',
            component: () =>
                import( /* webpackChunkName: "search" */ '../views/home/popup/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/home/car',
            name: 'car',
            component: () =>
                import( /* webpackChunkName: "car" */ '../views/home/car/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/home/orderform',
            name: 'orderForm',
            component: () =>
                import( /* webpackChunkName: "orderForm" */ '../views/home/orderform/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/home/pay',
            name: 'pay',
            component: () =>
                import( /* webpackChunkName: "pay" */ '../views/home/pay/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/kind',
            name: 'kind',
            component: () =>
                import( /* webpackChunkName: "kind" */ '../views/kind/index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/kind/details',
            name: 'kindDetails',
            component: () =>
                import( /* webpackChunkName: "kindDetails" */ '../views/kind/details/index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/kind/details/screen',
            name: 'detailsScreen',
            component: () =>
                import( /* webpackChunkName: "detailsScreen" */ '../views/kind/details/screen/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/kind/details/detail',
            name: 'detailsDetail',
            redirect: '/kind/details/detail/describe',
            component: () =>
                import( /* webpackChunkName: "detailsDetail" */ '../views/kind/details/detail/index.vue'),
            meta: {
                footerShow: false
            },
            children: [{
                    path: 'describe',
                    name: "goodsDescribe",
                    component: () =>
                        import( /* webpackChunkName: "goodsDescribe" */ '../views/kind/details/detail/describe/index.vue'),
                    meta: {
                        footerShow: false
                    }
                },
                {
                    path: 'discuss',
                    name: "goodsDiscuss",
                    component: () =>
                        import( /* webpackChunkName: "goodsDiscuss" */ '../views/kind/details/detail/discuss/index.vue'),
                    meta: {
                        footerShow: false
                    }
                }
            ]
        },

        {
            path: '/find',
            name: 'find',
            component: () =>
                import( /* webpackChunkName: "find" */ '../views/find/index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/mine',
            name: 'mine',
            component: () =>
                import( /* webpackChunkName: "mine" */ '../views/mine/index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/mine/set',
            name: 'set',
            component: () =>
                import( /* webpackChunkName: "set" */ '../views/mine/set/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/mine/login',
            name: 'login',
            component: () =>
                import( /* webpackChunkName: "login" */ '../views/mine/login/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/mine/register',
            name: 'register',
            component: () =>
                import( /* webpackChunkName: "register" */ '../views/mine/register/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/mine/forms',
            name: 'forms',
            component: () =>
                import( /* webpackChunkName: "forms" */ '../views/mine/forms/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/mine/address',
            name: 'address',
            component: () =>
                import( /* webpackChunkName: "forms" */ '../views/mine/address/index.vue'),
            meta: {
                footerShow: false
            }
        },
        {
            path: '/mine/address/edit',
            name: 'addressEdit',
            component: () =>
                import( /* webpackChunkName: "forms" */ '../views/mine/address/addressEdit/index.vue'),
            meta: {
                footerShow: false
            }
        },
        // {
        //     path: '/home/city', // 为了从逻辑上划分 当前组件页面的 关系 但是由于希望使用全局的router-view 所以必须是一级路由
        //     name: 'city',
        //     component: () =>
        //         import( /* webpackChunkName: "city" */ '../views/home/city/index.vue')
        // },
        // {
        //     path: '/home/sign', // 为了从逻辑上划分 当前组件页面的 关系 但是由于希望使用全局的router-view 所以必须是一级路由
        //     name: 'sign',
        //     component: () =>
        //         import( /* webpackChunkName: "city" */ '../views/home/sign/index.vue')
        // },
        // {
        //     path: '/movie',
        //     redirect: '/movie/hot',
        //     name: 'movie',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import( /* webpackChunkName: "movie" */ '../views/movie/index.vue'),
        //     meta: {
        //         footerShow: true
        //     },
        //     children: [{
        //             path: 'hot',
        //             name: "hot",
        //             component: () =>
        //                 import( /* webpackChunkName: "movie" */ '../views/movie/hot/index.vue'),
        //             meta: {
        //                 footerShow: true
        //             }
        //         },
        //         {
        //             path: 'soon',
        //             name: "soon",
        //             component: () =>
        //                 import( /* webpackChunkName: "movie" */ '../views/movie/soon/index.vue'),
        //             meta: {
        //                 footerShow: true
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '/movie/hot/info/:id',
        //     name: "info",
        //     component: () =>
        //         import( /* webpackChunkName: "movie" */ '../views/movie/info/index.vue'),
        // },
        // {
        //     path: '/movie/score',
        //     name: 'score',
        //     component: () =>
        //         import( /* webpackChunkName: "score" */ '../views/movie/score/index.vue'),

        // },
        // {
        //     path: '/movie/performer',
        //     name: 'performer',
        //     component: () =>
        //         import( /* webpackChunkName: "performer" */ '../views/movie/performer/index.vue'),

        // },
        // {
        //     path: '/movie/boxOffice',
        //     name: 'boxOffice',
        //     component: () =>
        //         import( /* webpackChunkName: "boxOffice" */ '../views/movie/boxOffice/index.vue'),

        // },
        // {
        //     path: '/ticket',
        //     name: 'ticket',
        //     component: () =>
        //         import( /* webpackChunkName: "ticket" */ '../views/ticket/index.vue'),
        //     meta: {
        //         footerShow: true
        //     }
        // },

        // {
        //     path: '/cinema',
        //     name: 'cinema',
        //     component: () =>
        //         import( /* webpackChunkName: "cinema" */ '../views/cinema/index.vue'),
        //     meta: {
        //         footerShow: true
        //     }
        // },
        // {
        //     path: '/main',
        //     name: 'main',
        //     component: () =>
        //         import( /* webpackChunkName: "main" */ '../views/main/index.vue'),
        //     meta: {
        //         footerShow: true
        //     }
        // },
        // {
        //     path: '/main/orders',
        //     name: 'orders',
        //     component: () =>
        //         import( /* webpackChunkName: "orders" */ '../views/main/orders/index.vue'),
        // },
        // {
        //     path: '/main/orders/ticketDetail',
        //     name: 'ticketDetail',
        //     component: () =>
        //         import( /* webpackChunkName: "ticketDetail" */ '../views/main/orders/ticketDetail/index.vue'),
        // },
        // {
        //     path: '/main/userInfo',
        //     name: 'info',
        //     redirect: '/main/userInfo/want',
        //     component: () =>
        //         import( /* webpackChunkName: "info" */ '../views/main/userInfo/userInfo.vue'),
        //     children: [{
        //             path: '/main/userInfo/want',
        //             name: 'info-want',
        //             component: () =>
        //                 import( /* webpackChunkName: "info-want" */ '../views/main/userInfo/want/info-want.vue'),
        //         },
        //         {
        //             path: '/main/userInfo/watched',
        //             name: 'info-watched',
        //             component: () =>
        //                 import( /* webpackChunkName: "info-watched" */ '../views/main/userInfo/watched/info-watched.vue'),
        //         }
        //     ]
        // },
        // {
        //     path: '/main/userInfo/coupon',
        //     name: 'coupon',
        //     component: () =>
        //         import( /* webpackChunkName: "info-coupon" */ '../views/main/userInfo/coupon')
        // },
        // {
        //     path: '/main/userInfo/cinemaCard',
        //     name: 'cinemaCard',
        //     component: () =>
        //         import( /* webpackChunkName: "info-cinemaCard" */ '../views/main/userInfo/cinemaCard')
        // },
        // {
        //     path: '/main/setting',
        //     name: 'setting',
        //     component: () =>
        //         import( /* webpackChunkName: "setting" */ '../views/main/setting/setting.vue'),
        // },
        // {
        //     path: '/purch',
        //     name: 'purch',
        //     component: () =>
        //         import( /* webpackChunkName: "purch" */ '../views/purch/purch.vue'),
        //     meta: {
        //         footerShow: true
        //     },
        // },
        // {
        //     path: '/main/message',
        //     name: 'message',
        //     component: () =>
        //         import( /* webpackChunkName: "main" */ '../views/main/message')
        // },
        // {
        //     path: '/main/message/:name',
        //     name: 'inform',
        //     component: () =>
        //         import( /* webpackChunkName: "main-message" */ '../views/main/message/inform.vue')
        // },
        // {
        //     path: '/cinema/cinemaDetail',
        //     name: 'cinemaDetail',
        //     component: () =>
        //         import( /* webpackChunkName: "cinemaDetail" */ '../views/cinema/cinemaDetail/index.vue'),
        //     meta: {
        //         footerShow: false
        //     }
        // },
        // {
        //     path: '/cinema/seat',
        //     name: 'seat',
        //     component: () =>
        //         import( /* webpackChunkName: "seat" */ '../views/cinema/seat/index.vue'),
        //     meta: {
        //         footerShow: false
        //     }
        // },
        // {
        //     path: '/cinema/order',
        //     name: 'order',
        //     component: () =>
        //         import( /* webpackChunkName: "order" */ '../views/cinema/order/index.vue'),
        //     meta: {
        //         footerShow: false
        //     }
        // },
        // {
        //     path: '/cinema/address',
        //     name: 'address',
        //     component: () =>
        //         import( /* webpackChunkName: "address" */ '../views/cinema/address/index.vue'),
        //     meta: {
        //         footerShow: false
        //     }
        // },
        {
            path: '*', // 除了已经被配置过的路由 其余全部重定向到 /home
            redirect: '/home'
        }
    ],
    // scrollBehavior (to, from, savedPosition) {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve({ x: 0, y: 0 })
    //       }, 500)
    //     })
    //   }
})