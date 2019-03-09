<template>
    <div>
       <comment-box></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    components: {
        "comment-box": comment
    }
}
</script>
