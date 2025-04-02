<template>
	<div>
		<div class="flex w-full rounded-t-lg bg-white shadow-lg">
			<button
				@click="activeTab = 'desc'"
				class="relative flex-1 px-4 py-3 text-sm font-medium uppercase border-b-2 transition-all duration-500 ease-in-out"
				:class="
					activeTab === 'desc'
						? 'desc--active'
						: 'desc--inactive text-gray-200 hover:text-black'
				"
			>
				Описание
			</button>

			<button
				@click="activeTab = 'specs'"
				class="relative flex-1 px-4 py-3 text-sm font-medium uppercase border-b-2 transition-all duration-500 ease-in-out"
				:class="
					activeTab === 'specs'
						? 'specs--active'
						: 'specs--inactive text-gray-200 hover:text-black'
				"
			>
				Характеристики
			</button>
		</div>

		<div
			class="relative rounded-b-lg bg-white px-6 py-4 shadow-lg min-h-[130px]"
		>
			<Suspense v-if="activeTab.length > 0" :key="activeTab">
				<template #default>
					<AsyncProductInfo :data="toProps" />
				</template>
				<template #fallback>
					<LoadingCircle />
				</template>
			</Suspense>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	defineAsyncComponent,
	shallowRef,
	onMounted,
	computed,
	watch,
} from "vue";
import LoadingCircle from "~/components/LoadingCircle.vue";

const activeTab = ref("");
const { description, specification } = defineProps({
	description: { type: String },
	specification: { type: String },
});

const componentsMap = {
	desc: () => import("~/components/ProductDescription.vue"),
	specs: () => import("~/components/ProductSpecs.vue"),
};

const cache = {};
const AsyncProductInfo = shallowRef(null);

onMounted(() => {
	activeTab.value = "desc";
});

const toProps = computed(() =>
	activeTab.value === "desc" ? description : specification,
);

watch(activeTab, async (newTab) => {
	if (cache[newTab]) {
		AsyncProductInfo.value = cache[newTab];
	} else {
		const component = defineAsyncComponent(
			() =>
				new Promise((resolve) => {
					setTimeout(async () => {
						const module = await componentsMap[newTab]?.();
						cache[newTab] = module.default;
						resolve(module.default);
					}, 2000);
				}),
		);
		AsyncProductInfo.value = cache[newTab] = component;
	}
});
</script>
<style scoped lang="scss">
@use "~/assets/scss/_mixins" as *;

.desc {
	&--active::after {
		@include tabLine(rgb(37, 99, 235));
	}

	&--inactive::after {
		@include tabLine(rgb(37, 99, 235), 0% 0% 0% 100%);
	}
}

.specs {
	&--active::after {
		@include tabLine(rgb(37, 99, 235));
	}

	&--inactive::after {
		@include tabLine(rgb(37, 99, 235), 0% 100% 0% 0%);
	}
}
</style>
