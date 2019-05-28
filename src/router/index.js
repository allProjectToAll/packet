import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import VueCookies from 'vue-cookie'

import index from '@/components/index'
import my from '@/components/my'

import packetInfo from '@/components/packetInfo/packetInfo'
import receive from '@/components/packetInfo/publicRed/myReceive'
import send from '@/components/packetInfo/publicRed/mySend'

import sendPacketChoice from '@/components/sendPackets/choice'
import sendOrdinaryPacket from '@/components/sendPackets/sendOrdinaryPacket'
import previewOrdinaryPacket from '@/components/sendPackets/previewOrdinary'

import sendPackets from '@/components/sendPackets/sendProjectPackets'
import sendPackets2 from '@/components/sendPackets/sendProjectPackets2'
import sendPackets3 from '@/components/sendPackets/sendProjectPackets3'
import ordinaryRedInfo from '@/components/packetInfo/publicRed/redInfo/ordinary'
import fissionRedInfo from '@/components/packetInfo/publicRed/redInfo/fission'


import appDonwload from '@/components/appDownload'
// import fission from '@/components/fission/fission'
import packetHall from '@/components/packetHall/index'
import packetDrawOrdinary from '@/components/packetDraw/ordinary'
import packetDrawFission from '@/components/packetDraw/fission'

import HOST from '@/public/hostConfig.js'

import $i18n from '../i18n/i18n'

Vue.use(Router)

let router = new Router({
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path:'/envelope',
      component: index,
      children: [
        {
          path:'/',
          redirect:{name:'packetHall'}
        },
        {
          path:'my',
          component: my,
          beforeEnter: (to, from, next) => {
            if (Store.state.user.isLogin) {
              next();
            } else {
              let localToken = JSON.parse(VueCookies.get('token'));
              if (localToken) {
                Store.dispatch('setToken', localToken);
                next();
              } else {
                Store.dispatch('clearToken');
                next({
                  path: '/envelope/',
                })
              }
            }
          },
          children:[
            {
              path:'/',
              redirect:{path:'pkInfo'}
            },
            {
              path:'fission/:type/:redId',
              name:'fission',
              component:fissionRedInfo,
              meta:{
                title: $i18n.t('message.packetDetailTitle')
              },
            },
            {
              path:'ordinary/:type/:redId',
              name:'ordinary',
              component:ordinaryRedInfo,
              meta:{
                title: $i18n.t('message.packetDetailTitle')
              },
            },
            {
              path:'pkInfo',
              name:'packetInfo',
              component:packetInfo,
              meta:{
                title: $i18n.t('message.mypacketTitle'),
                keepAlive:true
              },
              children:[
                {
                  path:'/',
                  redirect:{path:'receive'}
                },
                {
                  path:'receive',
                  name:'receive',
                  component:receive,
                  meta:{
                    title:$i18n.t('message.mypacketTitle'),
                    keepAlive:true
                  }
                },
                {
                  path:'send',
                  name:'send',
                  component:send,
                  meta:{
                    title:$i18n.t('message.mypacketTitle'),
                    keepAlive:true
                  }
                }
              ]
            },
            {
              path:'sendF',
              name:'sendFissionPacket', //裂变红包发送
              component:sendPackets,
              meta:{
                title: $i18n.t('message.sendPacketTitle')
              },
            },
            {
              path: 'sendF2',
              name: 'sendPackets2',
              component: sendPackets2,
              meta:{
                title: $i18n.t('message.sendPacketTitle')
              },
            },
            {
              path: 'sendF3',
              name: 'sendPackets3',
              component: sendPackets3,
              meta:{
                title: $i18n.t('message.sendPacketTitle')
              },
            },
            {
              path: 'sendSel',
              name: 'sendPacketChoice',
              component: sendPacketChoice,
              meta:{
                title: $i18n.t('message.sendPacketTitle')
              },
            },
            {
              path: 'sendO',
              name: 'sendOrdinaryPacket',
              component: sendOrdinaryPacket,
              meta:{
                title: $i18n.t('message.sendPacketTitle')
              },
            },
            {
              path: 'preO',
              name: 'previewOrdinaryPacket',
              component: previewOrdinaryPacket,
              meta:{
                title: $i18n.t('message.sendPacketTitle')
              },
            },
          ]
        },
        {
          path:'hall',
          name:'packetHall',
          component:packetHall,
          meta: {
            title: $i18n.t('message.packetHallTitle'),
            keepAlive:true
          },
        },
        {
          path:'drawO/:id',
          name:'packetDrawOrdinary',
          component:packetDrawOrdinary,
          meta: {
            title: $i18n.t('message.drawPacketTitle')
          }
        },
        {
          path:'drawF/:id',
          name:'packetDrawFission',
          component:packetDrawFission,
          meta: {
            title: $i18n.t('message.drawPacketTitle')
          },
        },
        {
          path:'download',
          name:'appDonwload',
          component:appDonwload,
          beforeEnter (to, from, next) {
            //做一次刷新，使vue-router在微信浏览器中更新uri
            if (from.path !== '/') {
              router.go(to.path)
            }
            next()
          },
          meta: {
            title: $i18n.t('message.appDonwloadTitle')
          }
        }
      ]
    },
    {
      path:'/envelope/*',
      redirect:'/envelope'
    },
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
