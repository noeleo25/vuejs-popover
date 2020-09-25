<script>
import Vue from 'vue';
import VuePopover from '@/vue-popover.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VuePopover
  }
});
</script>

<template>
  <div id="app">
    <vue-popover />
  </div>
</template>
