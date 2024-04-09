<script setup lang="ts">
import {ref, reactive, watch, onMounted, nextTick} from "vue"
import {testData} from "./test"

import GridLayout from "./components/Grid/GridLayout.vue"
import GridItem from "./components/Grid/GridItem.vue"

let testLayout = ref(testData)

const refLayout = ref()

const colNum = ref<number>(12)

const mapCache: Map<string, any> = new Map()

function handleResize(
  i: string | number,
  h: number,
  w: number,
  hPx: number,
  wPx: number,
  x: number,
  y: number,
  prevX: number,
  prevY: number,
  edges: any
) {
  console.log("a", i, h, w, x, y)

  updateNeighbourGridItems(i, h, w, x, y, prevX, prevY, edges)
}

function itemResize(
  i: string | number,
  h: number,
  w: number,
  hPx: number,
  wPx: number,
  x: number,
  y: number,
  prevX: number,
  prevY: number,
  edges: any
) {
  // console.log("b", "i=" + i, "h=" + h, "w=" + w, "x=" + x, "y=" + y)

  updateNeighbourGridItems(i, h, w, x, y, prevX, prevY, edges)
}

function updateNeighbourGridItems(
  i: string | number,
  h: number,
  w: number,
  x: number,
  y: number,
  prevX: number,
  prevY: number,
  edges: any
) {
  const layout = testLayout.value
  const nids = findNeighboursGridItemId(i, h, w, edges, prevX)
  if (nids.length) {
    if (edges.left) {
      layout[i].x = x
      for (let j = 0; j < nids.length; j++) {
        layout[nids[j]].w = layout[i].x - layout[nids[j]].x
      }
    } else if (edges.right) {
      layout[i].w = w
      for (let j = 0; j < nids.length; j++) {
        const oldX = layout[nids[j]].x
        layout[nids[j]].x = layout[i].x + layout[i].w
        layout[nids[j]].w = layout[nids[j]].w + (oldX - layout[nids[j]].x)
      }
    } else if (edges.bottom) {
      layout[i].h = h
      for (let j = 0; j < nids.length; j++) {
        const oldY = layout[nids[j]].y
        layout[nids[j]].y = layout[i].y + layout[i].h
        layout[nids[j]].h = layout[nids[j]].h + (oldY - layout[nids[j]].y)
      }
    }
  }
}

function findNeighboursGridItemId(
  id: string | number,
  h: number,
  w: number,
  edges: any,
  prevX: number
) {
  const layout = testLayout.value
  let nids: Array<number>
  nids = []

  // if resizing is triggered by left-bttom or right-bottom then ignore
  if ((edges.left || edges.right) && edges.bottom) {
    return nids
  }

  for (let i = 0; i < layout.length; i++) {
    if (i == id) continue

    // find a neighbour from the right side
    if (edges.left) {
      if (layout[id].x === layout[i].x + layout[i].w || prevX === layout[i].x + layout[i].w) {
        if (layout[id].y < layout[i].y + layout[i].h && layout[id].y + layout[id].h > layout[i].y) {
          nids.push(i)
        }
      }
    } else if (edges.right) {
      if (layout[id].x + layout[id].w === layout[i].x) {
        if (layout[id].y < layout[i].y + layout[i].h && layout[id].y + layout[id].h > layout[i].y) {
          nids.push(i)
        }
      }
    } else if (edges.bottom) {
      if (layout[id].y + layout[id].h === layout[i].y) {
        if (layout[id].x < layout[i].x + layout[i].w && layout[id].x + layout[id].w > layout[i].x) {
          nids.push(i)
        }
      }
    }
  }

  return nids
}

const responsive = ref<boolean>(true)

function set$Children(vm: any) {
  if (vm && vm.i) {
    mapCache.set(vm.i, vm)
  }
}
// {x: number | null; y: number | null}

let mouseXY = {x: 0, y: 0}
let DragPos = {x: 0, y: 0, w: 1, h: 1, i: ""}

function drag(e: DragEvent) {
  e.stopPropagation()
  e.preventDefault()
  const t = document.getElementById("content") as HTMLElement
  let parentRect = t.getBoundingClientRect()
  let mouseInGrid = false
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true
  }
  if (mouseInGrid === true && testLayout.value.findIndex(item => item.i === "drop") === -1) {
    testLayout.value.push({
      x: (testLayout.value.length * 2) % colNum.value,
      y: testLayout.value.length + colNum.value, // puts it at the bottom
      w: 3,
      h: 4,
      i: "drop"
    })
  }

  let index = testLayout.value.findIndex(item => item.i === "drop")

  if (index !== -1) {
    try {
      refLayout.value.defaultGridItem.$el.style.display = "none"
    } catch {}
    let el = mapCache.get("drop")
    if (!el) return
    console.log("jjj")

    el.dragging = {top: mouseXY.y - parentRect.top, left: mouseXY.x - parentRect.left}
    let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
    if (mouseInGrid === true) {
      refLayout.value.dragEvent("dragstart", "drop", new_pos.x, new_pos.y, 3, 4)
      DragPos.i = String(index)
      DragPos.x = testLayout.value[index].x
      DragPos.y = testLayout.value[index].y
    }
    if (mouseInGrid === false) {
      refLayout.value.dragEvent("dragend", "drop", new_pos.x, new_pos.y, 3, 4)
      testLayout.value = testLayout.value.filter(obj => obj.i !== "drop")
    }
  }
}

function dragend() {
  const t = document.getElementById("content") as HTMLElement
  let parentRect = t.getBoundingClientRect()
  let mouseInGrid = false
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true
  }

  if (mouseInGrid === true) {
    refLayout.value.dragEvent("dragend", "drop", DragPos.x, DragPos.y, 3, 4)
    testLayout.value = testLayout.value.filter(obj => obj.i !== "drop")
    // UNCOMMENT below if you want to add a grid-item
    nextTick(() => {
      testLayout.value.push({
        x: DragPos.x,
        y: DragPos.y,
        w: 3,
        h: 4,
        i: DragPos.i
      })
      refLayout.value.dragEvent("dragend", DragPos.i, DragPos.x, DragPos.y, 3, 4)
      mapCache.delete("drop")
    })
  }
}

function addDragOverEvent(e: DragEvent) {
  mouseXY.x = e.clientX
  mouseXY.y = e.clientY
}
onMounted(() => {
  document.addEventListener("dragover", addDragOverEvent)
})
</script>

<template>
  <div class="layout">
    <div
      class="droppable-element"
      draggable="true"
      unselectable="on"
      @drag="drag"
      @dragend="dragend"
    >
      Droppable Element (Drag me!)
    </div>
    <div id="content">
      <GridLayout
        ref="refLayout"
        v-model:layout="testLayout"
        :responsive="true"
        :col-num="100"
        :row-height="10"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="false"
        :use-css-transforms="true"
        :prevent-collision="true"
        :margin="[1, 1]"
      >
        <grid-item
          v-for="item in testLayout"
          :ref="el => set$Children(el)"
          :key="item.i"
          class="test"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @resized="handleResize"
          @resize="itemResize"
        >
          <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
          <div>
            {{ item }}
            <!-- {{ style }} -->
          </div>
          <!--<button @click="clicked">CLICK ME!</button>-->
        </grid-item>
      </GridLayout>
    </div>
  </div>
</template>

<style scoped>
.layout {
  background-color: #eee;
}
.test {
  background-color: #ddd;
}
.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
</style>
