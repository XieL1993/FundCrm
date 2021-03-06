import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: '登录',
      path: '/login',
      component: resolve => {
        import('../page/system/login').then(module => {
          resolve(module)
        })
      },
      children: [
        {
          name: '注册',
          path: 'register',
          component: resolve => {
            import('../page/system/register.vue').then(module => {
              resolve(module)
            })
          }
        }
      ]
    },
    {
      path: '/',
      component: resolve => {
        import('../page/mainLayout').then(module => {
          resolve(module)
        })
      },
      redirect: '/home',
      children: [
        {
          name: '首页',
          path: '/home',
          component: resolve => {
            import('../page/home/home').then(module => {
              resolve(module)
            })
          }
        },
        {
          name: '股票',
          path: '/stock',
          component: resolve => {
            import('../page/stock/stock').then(module => {
              resolve(module)
            })
          }
        },
        {
          name: '社区',
          path: '/community',
          component: resolve => {
            import('../page/community/community').then(module => {
              resolve(module)
            })
          }
        },
        {
          name: '我的',
          path: '/me',
          component: resolve => {
            import('../page/me/me').then(module => {
              resolve(module)
            })
          }
        }
      ]
    },
    {
      name: '学生管理系统',
      path: '/student',
      component: resolve => {
        import('../page/student/index').then(module => {
          resolve(module)
        })
      },
      children: [
        {
          name: '新增学生',
          path: 'add',
          component: resolve => {
            import('../page/student/add').then(module => {
              resolve(module)
            })
          }
        }
      ]
    },
    {
      name: '京东商城',
      path: '/jd',
      component: resolve => {
        import('../page/jd/index').then(module => {
          resolve(module)
        })
      },
      children: [
        {
          name: '商品详情',
          path: 'detail/:id',
          component: resolve => {
            import('../page/jd/detail.vue').then(module => {
              resolve(module)
            })
          }
        },
        {
          name: '购物车',
          path: 'cart',
          component: resolve => {
            import('../page/jd/cart.vue').then(module => {
              resolve(module)
            })
          }
        },
        {
          name: '我的订单',
          path: 'order',
          component: resolve => {
            import('../page/jd/order.vue').then(module => {
              resolve(module)
            })
          },
          children: [
            {
              name: '订单详情',
              path: 'detail/:id',
              component: resolve => {
                import('../page/jd/order-detail.vue').then(module => {
                  resolve(module)
                })
              }
            }
          ]
        },
        {
          name: '新增产品',
          path: 'addProduct',
          component: resolve => {
            import('../page/jd/add-product.vue').then(module => {
              resolve(module)
            })
          }
        }
      ]
    }
  ]
})
