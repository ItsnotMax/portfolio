<template lang="html">
	<form @submit.prevent="handleSubmit">
		<div class="px-0 xs:px-6">
			<MailingsWidget
				@update:email="emailUpdate"
				:showWarning="showWarning"
			/>
			<SliderWidget
				:label="'Подписаться на все рассылки'"
				:sliderWidth="'32px'"
				:sliderHeight="'16px'"
				:thumbWidth="'14px'"
				:thumbHeight="'14px'"
				:isMainWidget="true"
				@update:choseAllMailings="isAllMailings"
				:chosenAllMailings="chosenAllMailingsBool"
			/>
		</div>
		<ul
			class="relative grid pt-[1.5rem] gap-6 xs:pt-8 sm:grid-cols-1 lg:grid-cols-2"
		>
			<div
				v-if="mailingsWarning"
				class="absolute text-[0.75rem] text-[red] px-6"
			>
				Вы не выбрали рассылки
			</div>
			<li
				v-for="mailing in mailingsList"
				:key="mailing.id"
				class="relative flex p-[13px] justify-between items-start bg-[#ffffff] rounded-2xl custom-shadow xs:p-6 "
			>
				<div class="pr-0 xs:pr-6">
					<div
						class="font-[400] text-[13px] leading-4 text-customGray mb-1"
					>
						{{ mailing.slug }}
					</div>
					<h3 class="font-[600] text-[20px] leading-5 mb-2">
						{{ mailing.headline }}
					</h3>
					<div
						class="max-w-[292px] font-[400] text-[13px] leading-4 text-customLightGray mb-4"
					>
						{{ mailing.describe }}
					</div>
					<ul class="mb-4">
						<li
							v-for="benefit in mailing.benefit"
							:key="benefit"
							class="flex font-[400] text-[14px] leading-4 mb-2"
						>
							<img src="../public/check.svg" alt="check" />
							<span class="ml-2">{{ benefit }}</span>
						</li>
					</ul>
					<SliderWidget
						:label="
							'Уже получает ' + mailing.countPerson + ' человек'
						"
						:id="mailing.id"
						:chosenAllMailings="selectedMailingsId.has(mailing.id)"
						@update:choseMailing="updateMailingSelection"
					/>
				</div>
				<img
					class="absolute top-[13px] right-[1rem] w-[40px] h-[40px] xs:relative xs:w-[80px] xs:h-[80px] xs:top-[0] xs:right-[0]"
					:src="mailing.img"
					alt="img"
				/>
			</li>
		</ul>
	</form>
</template>

<script setup lang="js">
import { ref } from "vue";
import { useHead, useFetch } from "#app";
import MailingsWidget from "~/components/MailingsWidget.vue";
import SliderWidget from "~/components/SliderWidget.vue";
import { emailValidator } from "~/composables/emailValidator";
// eslint-disable-next-line no-undef
const config = useRuntimeConfig();

const { data: mailingsList } = await useFetch(config.public.getURL);
const chosenAllMailingsBool = ref(false);
const selectedMailingsId = ref(new Set());
const showWarning = ref(false);
const mailingsWarning = ref(false);
const email = ref("");

const emailUpdate = (inputed) => {
	email.value = inputed;
	if (email.value.length > 0 && !emailValidator(email.value)) {
		showWarning.value = true;
	} else {
		showWarning.value = false;
	}
};

const isAllMailings = (bool) => {
	if (bool && mailingsList.value) {
		selectedMailingsId.value = new Set(
			mailingsList.value.map((mailing) => mailing.id)
		);
		chosenAllMailingsBool.value = true;
		mailingsWarning.value = false;
	} else {
		selectedMailingsId.value = new Set();
		chosenAllMailingsBool.value = false;
	}
};

const updateMailingSelection = (mailingId) => {
	if (selectedMailingsId.value.has(mailingId)) {
		selectedMailingsId.value.delete(mailingId);
		chosenAllMailingsBool.value = false;
	} else {
		selectedMailingsId.value.add(mailingId);
		mailingsWarning.value = false;
	}

	if (
		mailingsList.value &&
		selectedMailingsId.value.size === mailingsList.value.length
	) {
		chosenAllMailingsBool.value = true;
		mailingsWarning.value = false;
	}
};

const handleSubmit = async() => {
	if (selectedMailingsId.value.size === 0) {
		mailingsWarning.value = true;
		showWarning.value = !emailValidator(email.value);
		return;
	} else {
		mailingsWarning.value = false;
	}
	if (!emailValidator(email.value)) {
		showWarning.value = true;
	}
	if (emailValidator(email.value) && selectedMailingsId.value.size > 0) {
		const data = {
			email: email.value,
			idList: Array.from(selectedMailingsId.value),
		};
		try {
			const response = await fetch(config.public.postURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error(`${response.message}: ${response.statusCode}`);
			}

			alert("Вы оформили подписку")

		} catch (error) {
			console.log(error);
		}
	}
};

useHead({
	title: "Klerk landing",
	meta: [
		{
			name: "description",
			content: "Дерево сущностей Klerk",
		},
		{
			name: "keywords",
			content: "Klerk, API, GET, дерево, ссылки Klerk, компания",
		},
		{ name: "author", content: "Максим Ушаков" },
	],
});
</script>
