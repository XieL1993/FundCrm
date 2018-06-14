import Vue from 'vue'
import {
  Button,
  Tab,
  Tabs,
  PullRefresh,
  NoticeBar,
  List,
  CellSwipe,
  Field,
  Cell,
  CellGroup,
  Actionsheet,
  DatetimePicker,
  Search,
  Lazyload,
  Swipe,
  SwipeItem,
  Stepper,
  SubmitBar
} from 'vant'

Vue.use(Button).use(Tab).use(Tabs).use(PullRefresh).use(NoticeBar)

Vue.use(List).use(CellSwipe).use(Field).use(Cell).use(CellGroup)

Vue.use(Actionsheet).use(DatetimePicker).use(Search).use(Swipe).use(SwipeItem)

Vue.use(Lazyload, {
  loading: require('../image/default_image.png'),
  error: require('../image/default_image.png')
})

Vue.use(Stepper).use(SubmitBar)
