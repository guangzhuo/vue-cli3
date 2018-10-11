<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breads" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "BreadCtumb",
        props:{
            breads: {
                type: Array,
                default:[]
            }

        },
        data() {
            return {}
        },
        creatd() {
        },
        mounted() {
        },
        methods: {},
        components: {}

    }
</script>

<style scoped>

</style>