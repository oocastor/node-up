<template>
    <div v-if="selectedInstance">
        <p class="m-0 text-200 mb-3 text-overflow">{{ $t('main-page.instances-comp.instance') }} ({{ selectedInstance.name }})</p>
        <div class="w-full flex flex-column gap-3 surface-card border-round p-3">
            <div class="flex justify-content-between">
                <div class="flex align-items-center gap-3 w-8">
                    <p class="text-3xl m-0 font-bold text-overflow">{{ selectedInstance.name }}</p>
                    <Chip :label="$t('main-page.instances-comp.running')" icon="pi pi-check" class="text-xs bg-green-600"
                        v-if="selectedInstance.status == 1"></Chip>
                    <Chip :label="$t('main-page.instances-comp.stopped')" icon="pi pi-exclamation-triangle" class="text-xs bg-red-600"
                        v-if="selectedInstance.status == -1"></Chip>
                    <Chip :label="$t('main-page.instances-comp.stopped')" icon="pi pi-times" class="text-xs bg-red-600" v-if="selectedInstance.status == 0">
                    </Chip>
                    <Chip :label="$t('main-page.instances-comp.restarting')" icon="pi pi-stopwatch" class="text-xs bg-orange-600"
                        v-if="selectedInstance.status == 2"></Chip>
                    <Chip :label="$t('main-page.instances-comp.updating')" icon="pi pi-stopwatch" class="text-xs bg-blue-600"
                        v-if="selectedInstance.status == 3"></Chip>
                </div>
                <div class="flex gap-3">
                    <i class="pi pi-cog text-xl text-gray-400 cursor-pointer"
                        @click="openInstanceUpdateView(selectedInstance);"></i>
                    <i class="pi pi-times text-xl text-gray-400 cursor-pointer"
                        @click=" this.$EVENT.emit('changeView', 0);"></i>
                </div>
            </div>
            <div class="flex align-item-center">
                <div class="flex gap-2 align-item-center" v-if="selectedInstance.network.isAccessable">
                    <i class="pi pi-link text-300"></i>
                    <a class="no-underline text-gray-400 font-mono"
                        :href="`https://${selectedInstance.network.redirect.sub}.${selectedInstance.network.redirect.domain}`"
                        v-if="selectedInstance.network.redirect.sub != '@'">{{
                            selectedInstance.network.redirect.sub }}.{{ selectedInstance.network.redirect.domain }}</a>
                    <a class="no-underline text-gray-400 font-mono"
                        :href="`https://${selectedInstance.network.redirect.domain}`" v-else>{{
                            selectedInstance.network.redirect.domain }}</a>
                </div>
                <p class="text-sm ml-auto m-0 text-gray-400 font-mono">{{$t('main-page.instances-comp.version')}} {{ selectedInstance.version }}</p>
            </div>
            <span class="p-buttonset w-full flex">
                <Button :loading="selectedInstance.status == 2" :label="selectedInstance.status == 0 ? $t('main-page.instances-comp.start') : $t('main-page.instances-comp.restart')"
                    icon="pi pi-refresh" class="p-button-sm flex-auto bg-white-a15 text-white"
                    @click=" startAction(this.selectedInstance.status == 1 ? 2 : 1);"></Button>
                <Button :label="$t('main-page.instances-comp.stop')" icon="pi pi-stop" class="p-button-sm flex-auto bg-white-a15 text-white"
                    @click=" startAction(0);"></Button>
                <Button :label="$t('main-page.instances-comp.update')" icon="pi pi-download" class="p-button-sm flex-auto bg-white-a15 text-white"
                    @click=" startAction(3);"></Button>
            </span>
            <p class="m-0 mt-2 text-sm font-mono">{{ $t('main-page.instances-comp.stats') }}</p>
            <div class="flex gap-2">
                <countItem :str="$t('main-page.ram')" :num="selectedInstance.pm2?.monit.memory || 0" color="var(--white)"></countItem>
                <countItem :str="$t('main-page.cpu')" :num="selectedInstance.pm2?.monit.cpu || 0" color="var(--white)"></countItem>
            </div>
            <p class="m-0 mt-2 text-sm font-mono">{{ $t('main-page.instances-comp.logs') }}</p>
            <Textarea class="w-full h-10rem bg-white-a05 border-none overflow-y-scroll font-mono" autoResize="false"
                readonly :value="selectedInstance.pm2?.log || ''"></Textarea>
        </div>
    </div>
</template>

<script>
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Chip from 'primevue/chip';

import countItem from "@/components/instances-page/countItem.vue";

export default {
    data() {
        return {
            selectedInstance: null
        }
    },
    components: {
        countItem,
        Button,
        Textarea,
        Chip
    },
    props: {
        selectedInstanceId: String,
        openInstanceUpdateView: Function
    },
    methods: {
        startAction(i) {
            this.$STORAGE.socket.emit("instance:action", { _id: this.selectedInstance._id, status: i }, (data) => {
                let { error, msg } = data;
                if (error) {
                    this.$EVENT.emit("showToast", { severity: "error", title: "Error", msg });
                } else {
                    this.$EVENT.emit("showToast", { severity: "success", title: "Done", msg });
                }
                this.$EVENT.emit("update");
            });
        },
        update() {
            this.$STORAGE.socket.emit("instance:get", { _id: this.selectedInstanceId }, (data) => {
                let { error, payload } = data;
                if (!error) this.selectedInstance = payload;
            })
        }
    },
    created() {
        this.$EVENT.on("update", this.update);
    },
    unmounted() {
        this.$EVENT.off("update", this.update);
    },
}
</script>

<style lang="scss" scoped>
.bg-white-a15 {
    background-color: rgba(255, 255, 255, 0.15) !important;
}

.bg-white-a05 {
    background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>