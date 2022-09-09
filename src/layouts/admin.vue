<template>
    <el-container>
        <el-header>
            <f-header />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <f-taglist />
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
    import FHeader from './components/FHeader.vue';
    import FMenu from './components/FMenu.vue';
    import FTaglist from './components/FTaglist.vue';
</script>

<style>
    .el-aside{
        transition: all 0.2s;
    }
</style>