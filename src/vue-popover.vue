<template>
  <div :class="['popover-group', groupClass]">
    <button
      :class="['popover-btn', buttonClass]"
      @click.stop="toggle">
      <slot name="button-content"></slot>
    </button>
    <div 
      :class="popoverClass"
      v-click-outside="close"
      :style="popoverPosition">
      <div v-if="showTriangle"
        class="triangle-container">
        <div class="triangle-with-shadow"></div>
      </div>
      <slot name="popover-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VuePopover', // vue component name
  props:{
    groupClass:{
      type: String,
      required: false
    },
    buttonClass:{
      type: String,
      required: false
    },
    position:{
      type: String,
      default: 'right-bottom'
    },
    showTriangle: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      popoverClass: 'popover-list'
    };
  },
  computed: {
    popoverPosition(){
      var pos = 'right'
      switch (this.position) {
        case 'right-bottom':
          pos = 'right: 0; bottom: 50px';
          break;
        case 'bottom':
          pos = 'right: 50%; bottom: 50px';
          break;
      }
      return pos;
    }
  },
  methods: {
    toggle(){
      if(this.popoverClass == 'popover-list')
        this.popoverClass = 'popover-list show';
      else
        this.popoverClass = 'popover-list';
    },
    close(){
      this.popoverClass = 'popover-list';
    },
  },
  watch: {
    $route (){
      this.close(); //close dropdown if view (route changes)
    }
  },
};
</script>

<style scoped>
.popover-group{
  position: relative;
  height: 40px;
  position: relative;
  display: inline-block;
}
.popover-group > button{
  align-items: center;
}
.popover-list{
  position: absolute;
  min-width: 310px;

  visibility: hidden;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--light-bg);
  border-radius: 0 0 5px 5px;
  padding-bottom: 16px;
  transition: opacity 0.5s;
  opacity: 0;
  z-index: 19999999999;
}
/*
.dropdown-list::before{
  content: '';
  width: 0px;
  height: 0px;
  position: absolute;
  top: -11px;
  right: 4px;
  border-style: solid;
  border-top: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid var(--accent-orange);
  display: inline-block;
  vertical-align: middle;
}*/
.triangle-container{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 0;
}
.triangle-with-shadow {
  width: 32px;
  height: 24px;
  position: relative;
  top: -24px;
  right: 0;
  overflow: hidden;
  z-index: 1;
}
.triangle-with-shadow:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #FFF;
  transform: rotate(45deg);
  bottom: -10px;
  left: 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  /*box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.16);*/
}
.popover-list ul{
  list-style: none;
  padding: 0px;
  margin: 0;
}
.popover-list.show{
  visibility: visible;
  opacity: 1;
}
.popover-list .dropdown-option{
  padding: 8px 24px;
}
.popover-list .dropdown-option > a{
  color: var(--dark-text);
  display: block;
  cursor: pointer;
}
.popover-list .dropdown-option > a:hover{
  text-decoration: none;
  color: var(--accent-orange);
}
.popover-list .dropdown-option > a{
  font-size: 12px;
  line-height: 1;
  color: var(--dark-text);
}
.popover-btn:active,
.popover-btn:focus{
  border: none;
  outline: none;
}
</style>
